using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Text.Json;
using System.Windows;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Animation;
using Microsoft.Extensions.Logging;
using Microsoft.Web.WebView2.Core;
using OpenSoul.Gateway;
using OpenSoul.Protocol;
using OpenSoul.Services;

namespace OpenSoul;

/// <summary>
/// Main application window.
/// WPF shell with custom titlebar, system tray, and WebView2 hosting the Control UI.
/// </summary>
public partial class MainWindow : Window
{
    // --- Services ---
    private readonly ILoggerFactory _loggerFactory;
    private readonly ILogger<MainWindow> _logger;
    private readonly ControlChannel _controlChannel;
    private readonly AppSettingsStore _settingsStore = new();
    private readonly ThemeService _themeService;
    private readonly BridgeService _bridgeService;
    private readonly NotificationService _notificationService;
    private readonly WindowStateService _windowStateService;
    private readonly HotkeyService _hotkeyService;
    private readonly BackdropService _backdropService;
    private readonly UpdateService _updateService;
    private readonly DeepLinkService _deepLinkService;

    // --- State ---
    private AppSettings _settings = new();
    private bool _isShuttingDown;
    private bool _closeToTray = true;
    private bool _hasShownCloseToTrayNotice;
    private string _connectionState = "disconnected";

    // --- Win32 resize border constants ---
    /// <summary>Width in device-independent pixels of the resize grip at window edges.</summary>
    private const int RESIZE_BORDER = 8;

    public MainWindow()
    {
        InitializeComponent();

        // Create logging infrastructure
        _loggerFactory = LoggerFactory.Create(builder =>
        {
            builder.AddConsole();
            builder.SetMinimumLevel(LogLevel.Information);
        });
        _logger = _loggerFactory.CreateLogger<MainWindow>();

        // Create services
        _themeService = new ThemeService();
        _bridgeService = new BridgeService(_loggerFactory.CreateLogger<BridgeService>());
        _notificationService = new NotificationService(_loggerFactory.CreateLogger<NotificationService>());
        _windowStateService = new WindowStateService(_loggerFactory.CreateLogger<WindowStateService>());
        _hotkeyService = new HotkeyService(_loggerFactory.CreateLogger<HotkeyService>());
        _backdropService = new BackdropService(_loggerFactory.CreateLogger<BackdropService>());
        _updateService = new UpdateService(_loggerFactory.CreateLogger<UpdateService>());
        _deepLinkService = new DeepLinkService(_loggerFactory.CreateLogger<DeepLinkService>());

        // Create gateway infrastructure
        var nodeLocator = new NodeLocator(_loggerFactory.CreateLogger<NodeLocator>());
        var processManager = new GatewayProcessManager(
            _loggerFactory.CreateLogger<GatewayProcessManager>(), nodeLocator);
        var connection = new GatewayConnection(
            _loggerFactory.CreateLogger<GatewayConnection>(),
            _loggerFactory.CreateLogger<GatewayChannel>());

        _controlChannel = new ControlChannel(
            _loggerFactory.CreateLogger<ControlChannel>(),
            connection,
            processManager);

        // Wire up gateway events
        _controlChannel.StateChanged += OnControlChannelStateChanged;
        _controlChannel.ExecApprovalRequested += OnExecApprovalRequested;
        _controlChannel.DevicePairRequested += OnDevicePairRequested;

        // Wire up bridge events
        _bridgeService.ShellReady += OnBridgeShellReady;
        _bridgeService.ConnectionStateChanged += OnBridgeConnectionStateChanged;
        _bridgeService.WebThemeChanged += OnBridgeThemeChanged;
        _bridgeService.TabChanged += OnBridgeTabChanged;
        _bridgeService.NotifyRequested += OnBridgeNotifyRequested;
        _bridgeService.OpenExternalRequested += OnBridgeOpenExternal;
        _bridgeService.GatewayActionRequested += OnBridgeGatewayAction;
        _bridgeService.BadgeCountChanged += OnBridgeBadgeCountChanged;

        // Wire up theme changes
        _themeService.ThemeChanged += OnThemeChanged;

        // Wire up notification click
        _notificationService.NotificationActivated += OnNotificationActivated;

        // Wire up global hotkeys
        _hotkeyService.ToggleWindowRequested += () => Dispatcher.InvokeAsync(ToggleWindowVisibility);
        _hotkeyService.OpenChatRequested += () => Dispatcher.InvokeAsync(() =>
        {
            ShowAndFocusWindow();
            _ = _bridgeService.SendNavigateAsync("chat");
            _ = _bridgeService.SendFocusAsync("chat-input");
        });

        // Register window-level keyboard shortcuts
        RegisterKeyboardShortcuts();
    }

    // ═══════════ LIFECYCLE ═══════════

    private async void Window_Loaded(object sender, RoutedEventArgs e)
    {
        // Install Win32 message hook for edge resize (fixes WebView2 swallowing hit-test)
        InstallResizeHook();

        // Load and apply settings
        _settings = await _settingsStore.LoadAsync();
        _closeToTray = true;
        _hasShownCloseToTrayNotice = false;

        // Apply theme
        var themeMode = _settings.Theme switch
        {
            "light" => ThemeService.ThemeMode.Light,
            "dark" => ThemeService.ThemeMode.Dark,
            _ => ThemeService.ThemeMode.System,
        };
        _themeService.Mode = themeMode;
        _themeService.ApplyTheme();
        UpdateThemeIcon();

        // Restore window state
        _windowStateService.Restore(this);

        // Start splash entrance animation
        AnimateSplashIn();

        // Apply Mica/Acrylic backdrop on Windows 11 (graceful fallback on Win10)
        var isDark = _themeService.Resolved == ThemeService.ResolvedTheme.Dark;
        _backdropService.Apply(this, isDark);

        // Register system-wide global hotkeys (Ctrl+Shift+O, Ctrl+Shift+C)
        _hotkeyService.Register(this);

        // Register opensoul:// protocol and start deep link listener
        _deepLinkService.RegisterProtocol();
        _deepLinkService.LinkReceived += OnDeepLinkReceived;
        _deepLinkService.StartListening();

        // Start background update checks (Velopack)
        _updateService.UpdateReady += OnUpdateReady;
        _updateService.StartBackgroundChecks();

        // Start gateway connection early so WebView sees a ready endpoint sooner.
        if (_settings.AutoConnectOnLaunch)
        {
            UpdateSplashStatus("Starting gateway...");
            _ = ConnectGatewayAsync();
        }

        // Initialize WebView2
        UpdateSplashStatus("Loading interface...");
        await InitializeWebViewAsync();

        // Process command-line deep link (e.g., --deeplink opensoul://chat)
        ProcessStartupDeepLink();
    }

    /// <summary>Handle deep link from command-line args (--deeplink URI).</summary>
    private void ProcessStartupDeepLink()
    {
        var args = Environment.GetCommandLineArgs();
        for (var i = 0; i < args.Length - 1; i++)
        {
            if (string.Equals(args[i], "--deeplink", StringComparison.OrdinalIgnoreCase))
            {
                _deepLinkService.HandleUri(args[i + 1]);
                break;
            }
        }
    }

    private async void Window_Closing(object? sender, CancelEventArgs e)
    {
        if (_isShuttingDown)
            return;

        // Close to tray behavior
        if (_closeToTray && !_isShuttingDown)
        {
            e.Cancel = true;
            Hide();

            // Show first-time notice
            if (!_hasShownCloseToTrayNotice)
            {
                _hasShownCloseToTrayNotice = true;
                _notificationService.Show(
                    "OpenSoul is still running",
                    "The app has been minimized to the system tray. Right-click the tray icon for options.",
                    tag: "close-to-tray");
            }
            return;
        }

        // Actually shutting down
        await ShutdownAsync();
    }

    private void Window_Activated(object sender, EventArgs e)
    {
        _ = _bridgeService.SendWindowStateAsync("focused");
    }

    private void Window_Deactivated(object sender, EventArgs e)
    {
        _ = _bridgeService.SendWindowStateAsync("blurred");
    }

    private void Window_StateChanged(object? sender, EventArgs e)
    {
        // Update maximize/restore icon
        MaximizeIcon.Text = WindowState == WindowState.Maximized ? "\uE923" : "\uE922";
        MaximizeButton.ToolTip = WindowState == WindowState.Maximized ? "Restore" : "Maximize";

        // Notify WebView2 about minimize
        if (WindowState == WindowState.Minimized)
        {
            _ = _bridgeService.SendWindowStateAsync("minimized");
        }

        // Save window state on change
        if (WindowState != WindowState.Minimized)
        {
            _ = _windowStateService.SaveAsync(this);
        }
    }

    private async Task ShutdownAsync()
    {
        _isShuttingDown = true;

        // Save window state
        await _windowStateService.SaveAsync(this);

        // Save settings
        await _settingsStore.SaveAsync(_settings);

        // Disconnect gateway
        try
        {
            var mode = string.Equals(_settings.ConnectionMode, "Remote", StringComparison.OrdinalIgnoreCase)
                ? ConnectionMode.Remote
                : ConnectionMode.Local;
            await _controlChannel.StopAsync(stopGateway: mode == ConnectionMode.Local);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Error stopping control channel");
        }

        // If there's a pending update, apply it on exit
        if (_updateService.HasPendingUpdate)
        {
            _updateService.ApplyUpdateOnExit();
        }

        // Cleanup services
        try
        {
            _updateService.StopBackgroundChecks();
            _deepLinkService.Dispose();
            _hotkeyService.Dispose();
            _bridgeService.Dispose();
            _notificationService.Dispose();
            _themeService.Dispose();
            await _controlChannel.DisposeAsync();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Error during cleanup");
        }

        // Dispose tray icon
        TrayIcon?.Dispose();
        _loggerFactory.Dispose();
    }

    // ═══════════ WEBVIEW2 INITIALIZATION ═══════════

    private async Task InitializeWebViewAsync()
    {
        try
        {
            // Create WebView2 environment with custom data folder
            var userDataFolder = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "OpenSoul", "WebView2");

            // Bypass system proxy for loopback and virtual host addresses.
            // Without this, system proxies (VPN, Clash, etc.) can intercept
            // the WebSocket connection to the local gateway, causing failures.
            var options = new CoreWebView2EnvironmentOptions(
                $"--proxy-bypass-list=localhost;127.0.0.1;[::1];{VIRTUAL_HOST};<local>");

            var env = await CoreWebView2Environment.CreateAsync(
                browserExecutableFolder: null,
                userDataFolder: userDataFolder,
                options: options);

            await WebView.EnsureCoreWebView2Async(env);

            // Configure WebView2 settings
            var settings = WebView.CoreWebView2.Settings;
            settings.IsStatusBarEnabled = false;
            settings.AreDefaultContextMenusEnabled = false;
            settings.IsZoomControlEnabled = false;
            settings.AreBrowserAcceleratorKeysEnabled = false;

            #if DEBUG
            settings.AreDevToolsEnabled = true;
            #else
            settings.AreDevToolsEnabled = false;
            #endif

            // Attach bridge service
            _bridgeService.Attach(WebView);

            // Inject bridge initialization script before page load
            await WebView.CoreWebView2.AddScriptToExecuteOnDocumentCreatedAsync(GetBridgeInitScript());

            // Map local Control UI folder to a virtual hostname so ES modules work
            // (file:// protocol blocks ES module imports due to CORS security)
            SetupVirtualHostMapping(WebView.CoreWebView2);

            // Navigate to Control UI
            var controlUiUrl = GetControlUiUrl();
            _logger.LogInformation("Navigating WebView2 to: {Url}", controlUiUrl);
            WebView.CoreWebView2.Navigate(controlUiUrl);

            // Handle navigation completed
            WebView.CoreWebView2.NavigationCompleted += OnWebViewNavigationCompleted;
        }
        catch (WebView2RuntimeNotFoundException)
        {
            _logger.LogError("WebView2 runtime not found");
            ShowWebView2Fallback();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "WebView2 initialization failed");
            ShowWebView2Fallback();
        }
    }

    /// <summary>Virtual hostname used for serving Control UI files via WebView2.</summary>
    private const string VIRTUAL_HOST = "opensoul.localapp";

    /// <summary>The resolved local folder path for Control UI files.</summary>
    private string? _controlUiFolderPath;

    /// <summary>
    /// Set up a virtual hostname mapping so that Control UI files are served
    /// via https://opensoul.localapp/ instead of file://.
    /// This is required because Vite-built ES modules cannot load under file:// due to CORS.
    /// </summary>
    private void SetupVirtualHostMapping(CoreWebView2 coreWebView)
    {
        var folderPath = ResolveControlUiFolderPath();
        if (folderPath is not null)
        {
            _controlUiFolderPath = folderPath;
            coreWebView.SetVirtualHostNameToFolderMapping(
                VIRTUAL_HOST,
                folderPath,
                CoreWebView2HostResourceAccessKind.Allow);

            _logger.LogInformation(
                "Virtual host mapping: https://{Host}/ → {Path}", VIRTUAL_HOST, folderPath);
        }
    }

    /// <summary>
    /// Find the Control UI folder on disk.
    /// Checks the app base directory first, then the project dist folder.
    /// </summary>
    private string? ResolveControlUiFolderPath()
    {
        var baseDir = AppDomain.CurrentDomain.BaseDirectory;

        // Check bundled control-ui next to the exe
        var bundledDir = Path.Combine(baseDir, "control-ui");
        if (File.Exists(Path.Combine(bundledDir, "index.html")))
        {
            return bundledDir;
        }

        // Fallback: check project dist folder (for dev builds run via dotnet run)
        var distDir = Path.GetFullPath(
            Path.Combine(baseDir, "..", "..", "..", "..", "dist", "control-ui"));
        if (File.Exists(Path.Combine(distDir, "index.html")))
        {
            return distDir;
        }

        _logger.LogWarning("Control UI folder not found");
        return null;
    }

    /// <summary>
    /// Returns the URL for the Control UI.
    /// In development, connects to the Vite dev server.
    /// In production, uses virtual host mapping (https://opensoul.localapp/).
    /// </summary>
    private string GetControlUiUrl()
    {
        // Check for dev server override
        var devUrl = Environment.GetEnvironmentVariable("OPENSOUL_CONTROL_UI_URL");
        if (!string.IsNullOrWhiteSpace(devUrl))
        {
            return devUrl;
        }

        #if DEBUG
        return "http://localhost:5173";
        #else
        // Production: use virtual host mapping (avoids file:// CORS issues with ES modules)
        if (_controlUiFolderPath is not null)
        {
            return $"https://{VIRTUAL_HOST}/index.html";
        }

        // Last resort fallback
        _logger.LogWarning("Control UI files not found, falling back to localhost");
        return "http://localhost:5173";
        #endif
    }

    /// <summary>
    /// JavaScript code injected into WebView2 before page load.
    /// Sets up the bridge communication channel on the web side.
    /// </summary>
    private static string GetBridgeInitScript()
    {
        return """
            // OpenSoul Windows Bridge - injected by WPF shell
            (function() {
                'use strict';

                // Bridge message handler registry
                const handlers = new Map();

                // Listen for messages from WPF host
                window.chrome.webview.addEventListener('message', (event) => {
                    const msg = event.data;
                    if (!msg || !msg.type) return;

                    const handler = handlers.get(msg.type);
                    if (handler) {
                        handler(msg.payload);
                    }

                    // Also dispatch as a custom event for flexibility
                    window.dispatchEvent(new CustomEvent('opensoul-bridge', {
                        detail: msg
                    }));
                });

                // Public API for the Control UI to use
                window.__opensoul_bridge = {
                    // Send a message to WPF shell
                    send(type, payload) {
                        window.chrome.webview.postMessage({ type, payload });
                    },

                    // Register a handler for a specific message type from WPF
                    on(type, handler) {
                        handlers.set(type, handler);
                    },

                    // Remove a handler
                    off(type) {
                        handlers.delete(type);
                    },

                    // Check if running inside WPF shell
                    isDesktop: true,
                    platform: 'windows',
                };

                // Notify WPF that the bridge script is loaded
                // (shell.ready is sent later by Control UI after full init)
                console.log('[opensoul-bridge] Bridge script initialized');
            })();
            """;
    }

    private void OnWebViewNavigationCompleted(object? sender,
        CoreWebView2NavigationCompletedEventArgs e)
    {
        if (e.IsSuccess)
        {
            _logger.LogInformation("WebView2 navigation completed successfully");
        }
        else
        {
            _logger.LogError("WebView2 navigation failed: {Status}", e.WebErrorStatus);
        }

        // Hide splash with fade animation
        HideSplash();
    }

    /// <summary>Kick off splash entrance animations (icon scale-in + text fade).</summary>
    private void AnimateSplashIn()
    {
        var ease = new CubicEase { EasingMode = EasingMode.EaseOut };
        var duration = TimeSpan.FromMilliseconds(400);

        // Icon scales from 0.8 → 1.0
        SplashIconScale.BeginAnimation(
            System.Windows.Media.ScaleTransform.ScaleXProperty,
            new DoubleAnimation(0.8, 1.0, duration) { EasingFunction = ease });
        SplashIconScale.BeginAnimation(
            System.Windows.Media.ScaleTransform.ScaleYProperty,
            new DoubleAnimation(0.8, 1.0, duration) { EasingFunction = ease });

        // Brand text fades in after a short delay
        var brandFade = new DoubleAnimation(0, 1, TimeSpan.FromMilliseconds(300))
        {
            BeginTime = TimeSpan.FromMilliseconds(150),
            EasingFunction = ease,
        };
        SplashBrand.BeginAnimation(OpacityProperty, brandFade);

        // Status text fades in after brand
        var statusFade = new DoubleAnimation(0, 1, TimeSpan.FromMilliseconds(300))
        {
            BeginTime = TimeSpan.FromMilliseconds(300),
            EasingFunction = ease,
        };
        SplashStatus.BeginAnimation(OpacityProperty, statusFade);
    }

    /// <summary>Update the splash status text (e.g., "Connecting...").</summary>
    private void UpdateSplashStatus(string text)
    {
        if (SplashOverlay.Visibility == Visibility.Visible)
        {
            SplashStatus.Text = text;
        }
    }

    /// <summary>Fade out splash overlay with a smooth multi-phase animation.</summary>
    private void HideSplash()
    {
        if (SplashOverlay.Visibility == Visibility.Collapsed) return;

        var ease = new CubicEase { EasingMode = EasingMode.EaseInOut };

        // Phase 1: Icon scales up slightly (1.0 → 1.05) as a "done" effect
        var iconPulse = new DoubleAnimation(1.0, 1.05, TimeSpan.FromMilliseconds(150))
        {
            EasingFunction = ease,
            AutoReverse = true,
        };
        SplashIconScale.BeginAnimation(
            System.Windows.Media.ScaleTransform.ScaleXProperty, iconPulse);
        SplashIconScale.BeginAnimation(
            System.Windows.Media.ScaleTransform.ScaleYProperty, iconPulse);

        // Phase 2: Whole overlay fades out after a brief pause
        var fadeOut = new DoubleAnimation(1, 0, TimeSpan.FromMilliseconds(350))
        {
            BeginTime = TimeSpan.FromMilliseconds(200),
            EasingFunction = ease,
        };
        fadeOut.Completed += (_, _) =>
        {
            SplashOverlay.Visibility = Visibility.Collapsed;
        };
        SplashOverlay.BeginAnimation(OpacityProperty, fadeOut);
    }

    private void ShowWebView2Fallback()
    {
        WebView.Visibility = Visibility.Collapsed;
        SplashOverlay.Visibility = Visibility.Collapsed;
        WebView2Fallback.Visibility = Visibility.Visible;
    }

    // ═══════════ BRIDGE EVENT HANDLERS ═══════════

    private async void OnBridgeShellReady()
    {
        await Dispatcher.InvokeAsync(async () =>
        {
            _logger.LogInformation("Bridge: shell.ready received from Control UI");

            var (gatewayUrl, token) = ResolveGatewayInitPayload();

            // Send init message with all configuration
            await _bridgeService.SendInitAsync(
                theme: _themeService.ResolvedCssThemeName,
                gatewayUrl: gatewayUrl,
                token: token,
                settings: new
                {
                    sessionKey = _settings.SessionKey,
                    historyLimit = _settings.HistoryLimit,
                });
        });
    }

    private void OnBridgeConnectionStateChanged(string state)
    {
        Dispatcher.InvokeAsync(() =>
        {
            _connectionState = state;
            UpdateConnectionStatusDisplay(state);
            UpdateTrayIconState(state);
        });
    }

    private void OnBridgeThemeChanged(string theme)
    {
        // WebView2 changed its theme, but we keep WPF theme in sync via ThemeService
        // This handles the case where theme is changed within the web UI
        Dispatcher.InvokeAsync(() =>
        {
            var mode = theme == "light" ? ThemeService.ThemeMode.Light : ThemeService.ThemeMode.Dark;
            _themeService.Mode = mode;
            _settings.Theme = theme;
            UpdateThemeIcon();
            _ = _settingsStore.SaveAsync(_settings);
        });
    }

    private void OnBridgeTabChanged(string tab, string title)
    {
        Dispatcher.InvokeAsync(() =>
        {
            Title = string.IsNullOrWhiteSpace(title)
                ? "OpenSoul"
                : $"OpenSoul - {title}";
        });
    }

    private void OnBridgeNotifyRequested(string title, string body, string? tag)
    {
        // Only show native notification when window is not focused
        if (!IsActive)
        {
            _notificationService.Show(title, body, tag, action: "show");
        }
    }

    private void OnBridgeOpenExternal(string url)
    {
        try
        {
            Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to open external URL: {Url}", url);
        }
    }

    private async void OnBridgeGatewayAction(string action)
    {
        _logger.LogInformation("Bridge gateway action: {Action}", action);
        // Gateway restart/stop requests from WebView2
        // These will be handled when we wire up the ControlChannel to bridge
    }

    private void OnBridgeBadgeCountChanged(int count)
    {
        Dispatcher.InvokeAsync(() =>
        {
            // Update tray tooltip with badge count
            if (count > 0)
            {
                TrayIcon.ToolTipText = $"OpenSoul - {count} pending";
            }
            else
            {
                UpdateTrayTooltip(_connectionState);
            }
        });
    }

    // ═══════════ GATEWAY EVENT HANDLERS ═══════════

    private void OnControlChannelStateChanged(ControlChannelState state)
    {
        Dispatcher.InvokeAsync(async () =>
        {
            var stateStr = state switch
            {
                ControlChannelState.Connected => "connected",
                ControlChannelState.Connecting => "connecting",
                ControlChannelState.Degraded => "degraded",
                _ => "disconnected",
            };

            _connectionState = stateStr;

            // Update splash status text during startup
            UpdateSplashStatus(state switch
            {
                ControlChannelState.Connecting => "Connecting to gateway...",
                ControlChannelState.Connected => "Connected!",
                _ => "Waiting for gateway...",
            });

            UpdateConnectionStatusDisplay(stateStr);
            UpdateTrayIconState(stateStr);

            // When the gateway connects, re-send the init message to the Control UI
            // with the correct gateway URL. This fixes a timing issue where shell.ready
            // fires before the gateway is running, causing the UI to use a stale URL.
            if (state == ControlChannelState.Connected)
            {
                var (gatewayUrl, token) = ResolveGatewayInitPayload();
                if (!string.IsNullOrWhiteSpace(gatewayUrl))
                {
                    _logger.LogInformation(
                        "Gateway connected, sending updated URL to Control UI ({Mode} mode): {Url}",
                        _settings.ConnectionMode,
                        gatewayUrl);
                    await _bridgeService.SendInitAsync(
                        theme: _themeService.ResolvedCssThemeName,
                        gatewayUrl: gatewayUrl,
                        token: token,
                        settings: new
                        {
                            sessionKey = _settings.SessionKey,
                            historyLimit = _settings.HistoryLimit,
                        });
                }
            }
        });
    }

    private (string? GatewayUrl, string? Token) ResolveGatewayInitPayload()
    {
        if (string.Equals(_settings.ConnectionMode, "Remote", StringComparison.OrdinalIgnoreCase))
        {
            var remoteUrl = _settings.RemoteUrl?.Trim();
            return (string.IsNullOrWhiteSpace(remoteUrl) ? null : remoteUrl, null);
        }

        var port = OpenSoulPaths.ReadGatewayPort();
        if (port <= 0)
        {
            return (null, null);
        }

        return ($"ws://127.0.0.1:{port}", OpenSoulPaths.ReadGatewayToken());
    }

    private void OnExecApprovalRequested(ExecApprovalRequestParams request)
    {
        Dispatcher.InvokeAsync(async () =>
        {
            // Show urgent notification if minimized
            if (WindowState == WindowState.Minimized || !IsVisible)
            {
                _notificationService.ShowUrgent(
                    "Command Approval Required",
                    $"Command: {request.Command ?? "(unknown)"}",
                    action: "exec-approval");
            }

            // Show native dialog
            var dialog = new Windows.ExecApprovalDialog(request)
            {
                Owner = IsVisible ? this : null,
            };

            if (dialog.ShowDialog() == true)
            {
                try
                {
                    await _controlChannel.RequestVoidAsync(
                        GatewayMethod.ExecApprovalResolve,
                        new ExecApprovalResolveParams
                        {
                            RequestId = request.RequestId ?? "",
                            Approved = dialog.Approved,
                            Remember = dialog.Remember,
                        });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Exec approval resolve failed");
                }
            }
        });
    }

    private void OnDevicePairRequested(DevicePairRequestedEvent request)
    {
        Dispatcher.InvokeAsync(async () =>
        {
            // Show notification if minimized
            if (WindowState == WindowState.Minimized || !IsVisible)
            {
                _notificationService.ShowUrgent(
                    "Device Pairing Request",
                    $"Device: {request.DeviceName ?? request.DeviceId ?? "Unknown"}",
                    action: "device-pair");
            }

            // Show native dialog
            var dialog = new Windows.DevicePairingDialog(request)
            {
                Owner = IsVisible ? this : null,
            };

            if (dialog.ShowDialog() == true)
            {
                try
                {
                    if (dialog.Approved)
                    {
                        await _controlChannel.RequestVoidAsync(
                            GatewayMethod.DevicePairApprove,
                            new DevicePairApproveParams { RequestId = request.RequestId ?? "" });
                    }
                    else
                    {
                        await _controlChannel.RequestVoidAsync(
                            GatewayMethod.DevicePairReject,
                            new DevicePairRejectParams { RequestId = request.RequestId ?? "" });
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Device pairing resolve failed");
                }
            }
        });
    }

    // ═══════════ GATEWAY CONNECTION ═══════════

    private async Task ConnectGatewayAsync()
    {
        try
        {
            if (string.Equals(_settings.ConnectionMode, "Remote", StringComparison.OrdinalIgnoreCase))
            {
                await _controlChannel.StartAsync(ConnectionMode.Remote, new RemoteConnectionOptions
                {
                    Url = _settings.RemoteUrl,
                });
            }
            else
            {
                await _controlChannel.StartAsync(ConnectionMode.Local);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Gateway connection failed");
            _notificationService.Show("Connection Failed", ex.Message, tag: "connect-error");
        }
    }

    // ═══════════ UI STATE UPDATES ═══════════

    private void UpdateConnectionStatusDisplay(string state)
    {
        StatusText.Text = state switch
        {
            "connected" => "Connected",
            "connecting" => "Connecting...",
            "degraded" => "Degraded",
            _ => "Disconnected",
        };

        StatusDot.Fill = state switch
        {
            "connected" => FindResource("SuccessBrush") as Brush ?? Brushes.Green,
            "connecting" => FindResource("WarningBrush") as Brush ?? Brushes.Orange,
            "degraded" => FindResource("WarningBrush") as Brush ?? Brushes.Orange,
            _ => FindResource("MutedBrush") as Brush ?? Brushes.Gray,
        };

        StatusText.Foreground = state switch
        {
            "connected" => FindResource("SuccessBrush") as Brush ?? Brushes.Green,
            "degraded" => FindResource("WarningBrush") as Brush ?? Brushes.Orange,
            _ => FindResource("MutedBrush") as Brush ?? Brushes.Gray,
        };

        // Update tray context menu
        TrayMenuGatewayStatus.Header = $"Gateway: {StatusText.Text}";
    }

    private void UpdateTrayIconState(string state)
    {
        var iconName = state switch
        {
            "connected" => "tray-active",
            "degraded" => "tray-error",
            _ => "tray-idle",
        };

        try
        {
            TrayIcon.IconSource = new System.Windows.Media.Imaging.BitmapImage(
                new Uri($"pack://application:,,,/Resources/{iconName}.ico"));
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to update tray icon to {Icon}", iconName);
        }

        UpdateTrayTooltip(state);
    }

    private void UpdateTrayTooltip(string state)
    {
        TrayIcon.ToolTipText = state switch
        {
            "connected" => "OpenSoul - Connected",
            "connecting" => "OpenSoul - Connecting...",
            "degraded" => "OpenSoul - Degraded",
            _ => "OpenSoul - Disconnected",
        };
    }

    // ═══════════ THEME ═══════════

    private void OnThemeChanged(ThemeService.ResolvedTheme theme)
    {
        Dispatcher.InvokeAsync(async () =>
        {
            UpdateThemeIcon();

            // Update Mica backdrop dark/light mode
            _backdropService.UpdateDarkMode(theme == ThemeService.ResolvedTheme.Dark);

            // If Mica is active, keep window background transparent
            if (_backdropService.IsActive)
            {
                Background = System.Windows.Media.Brushes.Transparent;
            }

            // Sync to WebView2
            if (_bridgeService.IsReady)
            {
                await _bridgeService.SendThemeChangedAsync(
                    theme == ThemeService.ResolvedTheme.Dark ? "dark" : "light");
            }
        });
    }

    // ═══════════ TITLEBAR BUTTONS ═══════════

    private void MinimizeButton_Click(object sender, RoutedEventArgs e)
    {
        WindowState = WindowState.Minimized;
    }

    private void MaximizeButton_Click(object sender, RoutedEventArgs e)
    {
        WindowState = WindowState == WindowState.Maximized
            ? WindowState.Normal
            : WindowState.Maximized;
    }

    private void CloseButton_Click(object sender, RoutedEventArgs e)
    {
        Close();
    }

    private void ThemeToggleButton_Click(object sender, RoutedEventArgs e)
    {
        // Cycle through System -> Light -> Dark -> System
        var next = _themeService.Mode switch
        {
            ThemeService.ThemeMode.System => ThemeService.ThemeMode.Light,
            ThemeService.ThemeMode.Light => ThemeService.ThemeMode.Dark,
            ThemeService.ThemeMode.Dark => ThemeService.ThemeMode.System,
            _ => ThemeService.ThemeMode.System,
        };
        _themeService.Mode = next;
        _settings.Theme = next switch
        {
            ThemeService.ThemeMode.Light => "light",
            ThemeService.ThemeMode.Dark => "dark",
            _ => "system",
        };
        _ = _settingsStore.SaveAsync(_settings);
        UpdateThemeIcon();
    }

    /// <summary>No-op: theme toggle icon was removed from the titlebar (now in web UI Settings panel).</summary>
    private void UpdateThemeIcon()
    {
        // Intentionally empty — titlebar theme button was removed.
        // Theme is now managed via the web UI Settings panel.
    }

    // ═══════════ SYSTEM TRAY ═══════════

    private void TrayIcon_LeftClick(object sender, RoutedEventArgs e)
    {
        ToggleWindowVisibility();
    }

    private void TrayIcon_DoubleClick(object sender, RoutedEventArgs e)
    {
        ShowAndFocusWindow();
        _ = _bridgeService.SendNavigateAsync("chat");
        _ = _bridgeService.SendFocusAsync("chat-input");
    }

    private void TrayMenuDashboard_Click(object sender, RoutedEventArgs e)
    {
        ShowAndFocusWindow();
        _ = _bridgeService.SendNavigateAsync("overview");
    }

    private void TrayMenuChat_Click(object sender, RoutedEventArgs e)
    {
        ShowAndFocusWindow();
        _ = _bridgeService.SendNavigateAsync("chat");
    }

    private void TrayMenuSettings_Click(object sender, RoutedEventArgs e)
    {
        OpenSettingsWindow();
    }

    private void TrayMenuDevices_Click(object sender, RoutedEventArgs e)
    {
        ShowAndFocusWindow();
        _ = _bridgeService.SendNavigateAsync("devices");
    }

    private async void TrayMenuGatewayRestart_Click(object sender, RoutedEventArgs e)
    {
        try
        {
            await _controlChannel.StopAsync(stopGateway: true);
            await ConnectGatewayAsync();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to restart gateway");
        }
    }

    private async void TrayMenuGatewayStop_Click(object sender, RoutedEventArgs e)
    {
        try
        {
            await _controlChannel.StopAsync(stopGateway: true);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to stop gateway");
        }
    }

    private void TrayMenuNewChat_Click(object sender, RoutedEventArgs e)
    {
        ShowAndFocusWindow();
        _ = _bridgeService.SendNavigateAsync("chat");
        // Signal WebView2 to start a fresh chat session
        _ = _bridgeService.SendFocusAsync("chat-input");
    }

    private void TrayMenuShortcuts_Click(object sender, RoutedEventArgs e)
    {
        ShowAndFocusWindow();
        ToggleShortcutOverlay();
    }

    private void TrayMenuAbout_Click(object sender, RoutedEventArgs e)
    {
        MessageBox.Show(
            $"OpenSoul Desktop\nVersion {GetType().Assembly.GetName().Version}\n\nAI agent companion for your digital life.",
            "About OpenSoul",
            MessageBoxButton.OK,
            MessageBoxImage.Information);
    }

    private void TrayMenuQuit_Click(object sender, RoutedEventArgs e)
    {
        _closeToTray = false;
        _isShuttingDown = true;
        Close();
    }

    private void ToggleWindowVisibility()
    {
        if (IsVisible)
        {
            if (WindowState == WindowState.Minimized)
            {
                WindowState = WindowState.Normal;
                Activate();
            }
            else
            {
                Hide();
            }
        }
        else
        {
            ShowAndFocusWindow();
        }
    }

    private void ShowAndFocusWindow()
    {
        Show();
        if (WindowState == WindowState.Minimized)
        {
            WindowState = WindowState.Normal;
        }
        Activate();
        Focus();
    }

    // ═══════════ DRAG AND DROP ═══════════

    private void WebView_DragOver(object sender, DragEventArgs e)
    {
        if (e.Data.GetDataPresent(DataFormats.FileDrop))
        {
            e.Effects = DragDropEffects.Copy;
            e.Handled = true;
        }
    }

    private void WebView_Drop(object sender, DragEventArgs e)
    {
        if (e.Data.GetData(DataFormats.FileDrop) is string[] files && files.Length > 0)
        {
            var fileInfos = files.Select(f =>
            {
                var info = new FileInfo(f);
                return new BridgeService.FileDropInfo
                {
                    Name = info.Name,
                    Path = info.FullName,
                    Size = info.Exists ? info.Length : 0,
                };
            });

            _ = _bridgeService.SendFileDropAsync(fileInfos);
            e.Handled = true;
        }
    }

    // ═══════════ KEYBOARD SHORTCUTS ═══════════

    private void RegisterKeyboardShortcuts()
    {
        // Window-scoped shortcuts
        var bindings = CommandBindings;

        // Ctrl+, → Settings
        var settingsCmd = new RoutedCommand();
        settingsCmd.InputGestures.Add(new KeyGesture(Key.OemComma, ModifierKeys.Control));
        bindings.Add(new CommandBinding(settingsCmd, (_, _) => OpenSettingsWindow()));

        // Ctrl+Q → Quit
        var quitCmd = new RoutedCommand();
        quitCmd.InputGestures.Add(new KeyGesture(Key.Q, ModifierKeys.Control));
        bindings.Add(new CommandBinding(quitCmd, (_, _) =>
        {
            _closeToTray = false;
            _isShuttingDown = true;
            Close();
        }));

        // Ctrl+K → Command Palette (forwarded to WebView2 via bridge)
        var paletteCmd = new RoutedCommand();
        paletteCmd.InputGestures.Add(new KeyGesture(Key.K, ModifierKeys.Control));
        bindings.Add(new CommandBinding(paletteCmd, (_, _) =>
        {
            _ = _bridgeService.SendCommandPaletteAsync();
        }));

        // Ctrl+D → Open Dashboard
        var dashboardCmd = new RoutedCommand();
        dashboardCmd.InputGestures.Add(new KeyGesture(Key.D, ModifierKeys.Control));
        bindings.Add(new CommandBinding(dashboardCmd, (_, _) =>
        {
            _ = _bridgeService.SendNavigateAsync("overview");
        }));

        // Ctrl+1..4 → Switch tabs
        var tabKeys = new[] { Key.D1, Key.D2, Key.D3, Key.D4 };
        var tabNames = new[] { "chat", "overview", "devices", "config" };
        for (var i = 0; i < tabKeys.Length; i++)
        {
            var tabName = tabNames[i];
            var tabCmd = new RoutedCommand();
            tabCmd.InputGestures.Add(new KeyGesture(tabKeys[i], ModifierKeys.Control));
            bindings.Add(new CommandBinding(tabCmd, (_, _) =>
            {
                _ = _bridgeService.SendNavigateAsync(tabName);
            }));
        }

        // Ctrl+/ → Shortcut overlay
        var overlayCmd = new RoutedCommand();
        overlayCmd.InputGestures.Add(new KeyGesture(Key.Oem2, ModifierKeys.Control));
        bindings.Add(new CommandBinding(overlayCmd, (_, _) => ToggleShortcutOverlay()));

        // F11 → Toggle fullscreen
        var fullscreenCmd = new RoutedCommand();
        fullscreenCmd.InputGestures.Add(new KeyGesture(Key.F11));
        bindings.Add(new CommandBinding(fullscreenCmd, (_, _) => ToggleFullscreen()));

        // Ctrl+Shift+I → DevTools (debug only)
        #if DEBUG
        var devToolsCmd = new RoutedCommand();
        devToolsCmd.InputGestures.Add(new KeyGesture(Key.I, ModifierKeys.Control | ModifierKeys.Shift));
        bindings.Add(new CommandBinding(devToolsCmd, (_, _) =>
        {
            WebView.CoreWebView2?.OpenDevToolsWindow();
        }));
        #endif
    }

    private void ToggleFullscreen()
    {
        if (WindowStyle == WindowStyle.None && WindowState == WindowState.Maximized)
        {
            WindowState = WindowState.Normal;
        }
        else
        {
            WindowState = WindowState.Maximized;
        }
    }

    // ═══════════ SHORTCUT OVERLAY ═══════════

    private Windows.ShortcutOverlay? _shortcutOverlay;

    private void ToggleShortcutOverlay()
    {
        // If already open, close it
        if (_shortcutOverlay is not null && _shortcutOverlay.IsLoaded)
        {
            _shortcutOverlay.CloseAnimated();
            _shortcutOverlay = null;
            return;
        }

        _shortcutOverlay = new Windows.ShortcutOverlay
        {
            Owner = this,
        };
        _shortcutOverlay.Closed += (_, _) => _shortcutOverlay = null;
        _shortcutOverlay.ShowAnimated();
    }

    // ═══════════ SETTINGS WINDOW ═══════════

    private Windows.SettingsWindow? _settingsWindow;

    private void OpenSettingsWindow()
    {
        // Show the native settings window (reuse if already open)
        if (_settingsWindow is not null && _settingsWindow.IsLoaded)
        {
            _settingsWindow.Activate();
            return;
        }

        ShowAndFocusWindow();

        _settingsWindow = new Windows.SettingsWindow(_settings, _settingsStore, _themeService)
        {
            Owner = this,
        };

        _settingsWindow.SettingsSaved += OnSettingsSaved;
        _settingsWindow.Closed += (_, _) =>
        {
            _settingsWindow.SettingsSaved -= OnSettingsSaved;
            _settingsWindow = null;
        };

        _settingsWindow.Show();
    }

    private void OnSettingsSaved(AppSettings settings)
    {
        _settings = settings;

        // Apply close-to-tray setting
        _closeToTray = settings.CloseToTray;

        // Apply show-in-taskbar setting
        ShowInTaskbar = settings.ShowInTaskbar;

        // Sync theme to WebView2
        _ = _bridgeService.SendThemeChangedAsync(_themeService.ResolvedCssThemeName);

        // Sync settings to WebView2
        _ = _bridgeService.SendSettingsChangedAsync(new
        {
            sessionKey = settings.SessionKey,
            historyLimit = settings.HistoryLimit,
            theme = _themeService.ResolvedCssThemeName,
        });
    }

    // ═══════════ NOTIFICATION HANDLER ═══════════

    private void OnNotificationActivated(string action)
    {
        Dispatcher.InvokeAsync(() =>
        {
            ShowAndFocusWindow();

            switch (action)
            {
                case "show":
                    break;
                case "exec-approval":
                    // Bring to front; the dialog should already be showing
                    break;
                case "device-pair":
                    // Bring to front; the dialog should already be showing
                    break;
                default:
                    // Try to navigate to the action as a tab
                    _ = _bridgeService.SendNavigateAsync(action);
                    break;
            }
        });
    }

    // ═══════════ DEEP LINK ═══════════

    private void OnDeepLinkReceived(DeepLinkAction action)
    {
        Dispatcher.InvokeAsync(() =>
        {
            _logger.LogInformation("Handling deep link: {Type} → {Param}", action.Type, action.Parameter);

            // Always bring window to front
            ShowAndFocusWindow();

            switch (action.Type)
            {
                case DeepLinkType.Navigate:
                    if (!string.IsNullOrEmpty(action.Parameter))
                    {
                        _ = _bridgeService.SendNavigateAsync(action.Parameter);

                        // If extra param (e.g., session key for chat), forward it
                        if (!string.IsNullOrEmpty(action.Extra))
                        {
                            _ = _bridgeService.SendSettingsChangedAsync(new
                            {
                                sessionKey = action.Extra,
                            });
                        }
                    }
                    break;

                case DeepLinkType.OpenSettings:
                    OpenSettingsWindow();
                    break;

                case DeepLinkType.Connect:
                    if (!string.IsNullOrEmpty(action.Parameter))
                    {
                        _settings.RemoteUrl = action.Parameter;
                        _settings.ConnectionMode = "Remote";
                        _ = ConnectGatewayAsync();
                    }
                    break;
            }
        });
    }

    // ═══════════ AUTO-UPDATE ═══════════

    private void OnUpdateReady(string newVersion)
    {
        Dispatcher.InvokeAsync(() =>
        {
            _logger.LogInformation("Update v{Version} ready to install", newVersion);

            // Show a native toast notification
            _notificationService.Show(
                "Update Available",
                $"OpenSoul v{newVersion} is ready. Restart to apply the update.",
                "update");

            // Update the tray menu to reflect available update
            TrayMenuStatusItem.Header = $"OpenSoul — Update v{newVersion} ready";
            TrayMenuUpdate.Header = $"Update to v{newVersion} && Restart";
            TrayMenuUpdate.Visibility = Visibility.Visible;
        });
    }

    private void TrayMenuUpdate_Click(object sender, RoutedEventArgs e)
    {
        ApplyUpdateAndRestart();
    }

    /// <summary>Apply a pending update and restart the application.</summary>
    private async void ApplyUpdateAndRestart()
    {
        if (!_updateService.HasPendingUpdate) return;

        // Save window state before restart
        await _windowStateService.SaveAsync(this);

        _updateService.ApplyUpdateAndRestart();
    }

    // ═══════════ WEBVIEW2 FALLBACK ═══════════

    private void DownloadWebView2Button_Click(object sender, RoutedEventArgs e)
    {
        try
        {
            Process.Start(new ProcessStartInfo(
                "https://go.microsoft.com/fwlink/p/?LinkId=2124703")
            { UseShellExecute = true });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to open WebView2 download URL");
        }
    }

    // ═══════════ WIN32 EDGE-RESIZE HOOK ═══════════
    // WebView2 hosts its own HWND which swallows WM_NCHITTEST, preventing
    // WindowChrome resize grips from working at the left, right and bottom
    // edges. We hook WM_NCHITTEST on the top-level window and manually return
    // the correct HT* value when the cursor is within the resize border.

    private const int WM_NCHITTEST = 0x0084;

    // HT values from WinUser.h
    private const int HTCLIENT = 1;
    private const int HTLEFT = 10;
    private const int HTRIGHT = 11;
    private const int HTTOP = 12;
    private const int HTTOPLEFT = 13;
    private const int HTTOPRIGHT = 14;
    private const int HTBOTTOM = 15;
    private const int HTBOTTOMLEFT = 16;
    private const int HTBOTTOMRIGHT = 17;

    [DllImport("user32.dll")]
    private static extern IntPtr DefWindowProc(IntPtr hWnd, int msg, IntPtr wParam, IntPtr lParam);

    /// <summary>Install the WndProc hook on this window's HWND.</summary>
    private void InstallResizeHook()
    {
        var source = HwndSource.FromHwnd(new WindowInteropHelper(this).Handle);
        source?.AddHook(ResizeHookWndProc);
    }

    /// <summary>
    /// WndProc hook that intercepts WM_NCHITTEST and returns resize HT values
    /// when the cursor is within the RESIZE_BORDER zone at any window edge.
    /// This overrides the default hit-test which WebView2 would otherwise consume.
    /// </summary>
    private IntPtr ResizeHookWndProc(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam, ref bool handled)
    {
        if (msg != WM_NCHITTEST)
            return IntPtr.Zero;

        // Do not override resize when maximized (no resize borders visible)
        if (WindowState == WindowState.Maximized)
            return IntPtr.Zero;

        // Get cursor position in screen pixels (lParam = MAKELPARAM(x, y))
        var screenX = (short)(lParam.ToInt64() & 0xFFFF);
        var screenY = (short)((lParam.ToInt64() >> 16) & 0xFFFF);

        // Get window rect in screen coordinates
        var windowPoint = PointFromScreen(new Point(screenX, screenY));

        // Convert the RESIZE_BORDER from DIPs to the current DPI-aware value
        var dpi = VisualTreeHelper.GetDpi(this);
        var border = RESIZE_BORDER * dpi.DpiScaleX;

        var w = ActualWidth;
        var h = ActualHeight;

        var isLeft = windowPoint.X < border;
        var isRight = windowPoint.X > w - border;
        var isTop = windowPoint.Y < border;
        var isBottom = windowPoint.Y > h - border;

        // Only handle edges — return early if cursor is in the interior
        if (!isLeft && !isRight && !isTop && !isBottom)
            return IntPtr.Zero;

        int hitResult;
        if (isTop && isLeft) hitResult = HTTOPLEFT;
        else if (isTop && isRight) hitResult = HTTOPRIGHT;
        else if (isBottom && isLeft) hitResult = HTBOTTOMLEFT;
        else if (isBottom && isRight) hitResult = HTBOTTOMRIGHT;
        else if (isLeft) hitResult = HTLEFT;
        else if (isRight) hitResult = HTRIGHT;
        else if (isTop) hitResult = HTTOP;
        else hitResult = HTBOTTOM;

        handled = true;
        return new IntPtr(hitResult);
    }
}
