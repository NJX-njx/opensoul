using System.ComponentModel;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using Microsoft.Extensions.Logging;
using OpenSoul.Gateway;
using OpenSoul.Protocol;

namespace OpenSoul;

public partial class MainWindow : Window
{
    private readonly ILoggerFactory _loggerFactory;
    private readonly ILogger<MainWindow> _logger;
    private readonly ControlChannel _controlChannel;
    private readonly AppSettingsStore _settingsStore = new();

    private AppSettings _settings = new();
    private bool _isConnected;
    private bool _isShuttingDown;

    public MainWindow()
    {
        InitializeComponent();

        _loggerFactory = LoggerFactory.Create(builder =>
        {
            builder.AddConsole();
            builder.SetMinimumLevel(LogLevel.Information);
        });
        _logger = _loggerFactory.CreateLogger<MainWindow>();

        var nodeLocator = new NodeLocator(_loggerFactory.CreateLogger<NodeLocator>());
        var processManager = new GatewayProcessManager(_loggerFactory.CreateLogger<GatewayProcessManager>(), nodeLocator);
        var connection = new GatewayConnection(
            _loggerFactory.CreateLogger<GatewayConnection>(),
            _loggerFactory.CreateLogger<GatewayChannel>());

        _controlChannel = new ControlChannel(
            _loggerFactory.CreateLogger<ControlChannel>(),
            connection,
            processManager);

        _controlChannel.StateChanged += OnControlChannelStateChanged;
        _controlChannel.ChatEventReceived += OnChatEventReceived;
        _controlChannel.AgentEventReceived += OnAgentEventReceived;
        _controlChannel.ShutdownReceived += OnShutdownReceived;
        _controlChannel.ExecApprovalRequested += OnExecApprovalRequested;
        _controlChannel.DevicePairRequested += OnDevicePairRequested;
        _controlChannel.TickReceived += OnTickReceived;
        _controlChannel.SnapshotReceived += OnSnapshotReceived;

        Loaded += MainWindow_Loaded;
        Closing += MainWindow_Closing;
    }

    private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
    {
        OpenSoulPaths.EnsureDirectories();

        _settings = await _settingsStore.LoadAsync();
        ApplySettingsToUi(_settings);

        UpdateRemoteInputsEnabled();
        UpdateActionButtons();
        AppendEvent("Ready");
    }

    private async void MainWindow_Closing(object? sender, CancelEventArgs e)
    {
        if (_isShuttingDown)
            return;

        _isShuttingDown = true;
        await ShutdownAsync();
    }

    private async Task ShutdownAsync()
    {
        try
        {
            await _controlChannel.StopAsync(stopGateway: SelectedMode == ConnectionMode.Local);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Error while stopping control channel");
        }

        try
        {
            await _controlChannel.DisposeAsync();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Error while disposing control channel");
        }

        _loggerFactory.Dispose();
    }

    private ConnectionMode SelectedMode
    {
        get
        {
            var tag = (ModeComboBox.SelectedItem as ComboBoxItem)?.Tag?.ToString();
            return string.Equals(tag, "remote", StringComparison.OrdinalIgnoreCase)
                ? ConnectionMode.Remote
                : ConnectionMode.Local;
        }
    }

    private void ModeComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        UpdateRemoteInputsEnabled();
    }

    private async void ConnectButton_Click(object sender, RoutedEventArgs e)
    {
        try
        {
            ConnectButton.IsEnabled = false;
            StatusTextBlock.Text = "Connecting...";

            await SaveSettingsAsync();

            if (SelectedMode == ConnectionMode.Local)
            {
                await _controlChannel.StartAsync(ConnectionMode.Local);
                AppendEvent("Connect request sent (local)");
            }
            else
            {
                await _controlChannel.StartAsync(ConnectionMode.Remote, BuildRemoteOptions());
                AppendEvent($"Connect request sent (remote: {RemoteUrlTextBox.Text.Trim()})");
            }
        }
        catch (Exception ex)
        {
            AppendEvent($"Connect failed: {ex.Message}");
            _logger.LogError(ex, "Connect failed");
        }
        finally
        {
            UpdateActionButtons();
        }
    }

    private async void DisconnectButton_Click(object sender, RoutedEventArgs e)
    {
        try
        {
            await _controlChannel.StopAsync(stopGateway: SelectedMode == ConnectionMode.Local);
            AppendEvent("Disconnected");
        }
        catch (Exception ex)
        {
            AppendEvent($"Disconnect failed: {ex.Message}");
            _logger.LogError(ex, "Disconnect failed");
        }
        finally
        {
            UpdateActionButtons();
        }
    }

    private async void HealthButton_Click(object sender, RoutedEventArgs e)
    {
        try
        {
            var health = await _controlChannel.RequestAsync<JsonElement>(GatewayMethod.Health);
            if (health.ValueKind == JsonValueKind.Undefined)
            {
                AppendEvent("health returned empty response");
                return;
            }

            var pretty = JsonSerializer.Serialize(health, new JsonSerializerOptions { WriteIndented = true });
            AppendEvent("health response:\n" + pretty);
        }
        catch (Exception ex)
        {
            AppendEvent($"health failed: {ex.Message}");
            _logger.LogError(ex, "Health request failed");
        }
    }

    private async void SendButton_Click(object sender, RoutedEventArgs e)
    {
        var message = MessageTextBox.Text.Trim();
        if (string.IsNullOrWhiteSpace(message))
            return;

        var sessionKey = SessionKeyTextBox.Text.Trim();
        if (string.IsNullOrWhiteSpace(sessionKey))
            sessionKey = "main";

        try
        {
            await _controlChannel.RequestVoidAsync(
                GatewayMethod.ChatSend,
                new ChatSendParams
                {
                    SessionKey = sessionKey,
                    Message = message,
                });

            AppendChat($"you [{sessionKey}]", message);
            MessageTextBox.Clear();
        }
        catch (Exception ex)
        {
            AppendEvent($"send failed: {ex.Message}");
            _logger.LogError(ex, "Send failed");
        }
    }

    private void MessageTextBox_KeyDown(object sender, KeyEventArgs e)
    {
        if (e.Key == Key.Enter && Keyboard.Modifiers.HasFlag(ModifierKeys.Control))
        {
            e.Handled = true;
            SendButton_Click(sender, new RoutedEventArgs());
        }
    }

    private void ClearLogsButton_Click(object sender, RoutedEventArgs e)
    {
        ChatListBox.Items.Clear();
        EventListBox.Items.Clear();
        AppendEvent("Logs cleared");
    }

    private void OnControlChannelStateChanged(ControlChannelState state)
    {
        _ = Dispatcher.InvokeAsync(() =>
        {
            _isConnected = state == ControlChannelState.Connected;

            StateTextBlock.Text = state.ToString();
            StateTextBlock.Foreground = state switch
            {
                ControlChannelState.Connected => Brushes.ForestGreen,
                ControlChannelState.Connecting => Brushes.DarkGoldenrod,
                ControlChannelState.Degraded => Brushes.OrangeRed,
                _ => Brushes.DimGray,
            };

            StatusTextBlock.Text = state switch
            {
                ControlChannelState.Connected => "Connected",
                ControlChannelState.Connecting => "Connecting",
                ControlChannelState.Degraded => "Gateway degraded",
                _ => "Disconnected",
            };

            UpdateActionButtons();
        });
    }

    private void OnSnapshotReceived(HelloOk snapshot)
    {
        _ = Dispatcher.InvokeAsync(() =>
        {
            var activeSession = snapshot.Snapshot?.ActiveSessionKey;
            if (!string.IsNullOrWhiteSpace(activeSession))
            {
                SessionKeyTextBox.Text = activeSession;
            }

            var sessionCount = snapshot.Snapshot?.Sessions?.Length ?? 0;
            AppendEvent($"snapshot: protocol={snapshot.ProtocolVersion}, sessions={sessionCount}");
        });
    }

    private void OnChatEventReceived(ChatEvent chat)
    {
        var role = string.IsNullOrWhiteSpace(chat.Role) ? "assistant" : chat.Role;
        var content = chat.Content;
        if (string.IsNullOrWhiteSpace(content))
            content = chat.Type ?? "(empty chat event)";

        AppendChat(role!, content!);
    }

    private void OnAgentEventReceived(AgentEvent agent)
    {
        var role = string.IsNullOrWhiteSpace(agent.Role) ? "agent" : agent.Role;
        var content = agent.Content;
        if (string.IsNullOrWhiteSpace(content))
            content = agent.Type ?? "(empty agent event)";

        AppendChat(role!, content!);
    }

    private void OnShutdownReceived(string reason)
    {
        AppendEvent($"shutdown event: {reason}");
    }

    private void OnTickReceived()
    {
        _ = Dispatcher.InvokeAsync(() =>
        {
            if (_isConnected)
            {
                StatusTextBlock.Text = $"Connected (tick {DateTime.Now:HH:mm:ss})";
            }
        });
    }

    private void OnExecApprovalRequested(ExecApprovalRequestParams request)
    {
        var command = request.Command ?? "(unknown command)";
        AppendEvent($"exec approval requested: {command}");
    }

    private void OnDevicePairRequested(DevicePairRequestedEvent request)
    {
        var name = request.DeviceName ?? request.DeviceId ?? "unknown";
        AppendEvent($"device pairing requested: {name}");
    }

    private async Task SaveSettingsAsync()
    {
        _settings.ConnectionMode = SelectedMode.ToString();
        _settings.RemoteUrl = RemoteUrlTextBox.Text.Trim();
        _settings.SessionKey = SessionKeyTextBox.Text.Trim();
        await _settingsStore.SaveAsync(_settings);
    }

    private void ApplySettingsToUi(AppSettings settings)
    {
        RemoteUrlTextBox.Text = string.IsNullOrWhiteSpace(settings.RemoteUrl)
            ? "ws://127.0.0.1:3000"
            : settings.RemoteUrl;

        SessionKeyTextBox.Text = string.IsNullOrWhiteSpace(settings.SessionKey)
            ? "main"
            : settings.SessionKey;

        var targetTag = string.Equals(settings.ConnectionMode, "Remote", StringComparison.OrdinalIgnoreCase)
            ? "remote"
            : "local";

        var selected = ModeComboBox.Items
            .OfType<ComboBoxItem>()
            .FirstOrDefault(item => string.Equals(item.Tag?.ToString(), targetTag, StringComparison.OrdinalIgnoreCase));

        if (selected is not null)
        {
            ModeComboBox.SelectedItem = selected;
        }
    }

    private RemoteConnectionOptions BuildRemoteOptions()
    {
        return new RemoteConnectionOptions
        {
            Url = NullIfWhitespace(RemoteUrlTextBox.Text),
            Token = NullIfWhitespace(RemoteTokenTextBox.Text),
            Password = NullIfWhitespace(RemotePasswordBox.Password),
            DeviceToken = NullIfWhitespace(RemoteDeviceTokenTextBox.Text),
        };
    }

    private static string? NullIfWhitespace(string? value)
    {
        var trimmed = value?.Trim();
        return string.IsNullOrWhiteSpace(trimmed) ? null : trimmed;
    }

    private void UpdateRemoteInputsEnabled()
    {
        var enabled = SelectedMode == ConnectionMode.Remote;
        RemoteUrlTextBox.IsEnabled = enabled;
        RemoteTokenTextBox.IsEnabled = enabled;
        RemotePasswordBox.IsEnabled = enabled;
        RemoteDeviceTokenTextBox.IsEnabled = enabled;
    }

    private void UpdateActionButtons()
    {
        ConnectButton.IsEnabled = !_isConnected;
        DisconnectButton.IsEnabled = _isConnected;
        HealthButton.IsEnabled = _isConnected;
        SendButton.IsEnabled = _isConnected;
    }

    private void AppendChat(string source, string content)
    {
        var singleLine = ToSingleLine(content);
        AppendListLine(ChatListBox, $"{source}: {singleLine}");
    }

    private void AppendEvent(string content)
    {
        AppendListLine(EventListBox, content);
    }

    private void AppendListLine(ListBox listBox, string content)
    {
        void Append()
        {
            listBox.Items.Add($"{DateTime.Now:HH:mm:ss} {content}");
            if (listBox.Items.Count > 500)
            {
                listBox.Items.RemoveAt(0);
            }

            var last = listBox.Items.Count > 0 ? listBox.Items[listBox.Items.Count - 1] : null;
            if (last is not null)
            {
                listBox.ScrollIntoView(last);
            }
        }

        if (Dispatcher.CheckAccess())
        {
            Append();
        }
        else
        {
            _ = Dispatcher.InvokeAsync(Append);
        }
    }

    private static string ToSingleLine(string value)
    {
        var single = value.Replace("\r", " ").Replace("\n", " ").Trim();
        if (single.Length <= 600)
            return single;

        return single[..600] + " ...";
    }
}
