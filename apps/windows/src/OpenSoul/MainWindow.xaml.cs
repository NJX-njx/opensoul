using System.ComponentModel;
using System.Linq;
using System.Text;
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
    private const int MaxUiListItems = 500;
    private const int MaxHistoryLimit = 1000;
    private const int DefaultHistoryLimit = 120;

    private readonly ILoggerFactory _loggerFactory;
    private readonly ILogger<MainWindow> _logger;
    private readonly ControlChannel _controlChannel;
    private readonly AppSettingsStore _settingsStore = new();
    private readonly Dictionary<string, string> _chatDeltaBuffers = new(StringComparer.Ordinal);

    private AppSettings _settings = new();
    private bool _isConnected;
    private bool _isShuttingDown;
    private bool _isLoadingSessions;
    private bool _isLoadingHistory;
    private bool _isSyncingSessionPicker;

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
        if (_settings.HistoryLimit <= 0)
        {
            _settings.HistoryLimit = DefaultHistoryLimit;
        }
        _settings.HistoryLimit = Math.Clamp(_settings.HistoryLimit, 1, MaxHistoryLimit);

        ApplySettingsToUi(_settings);
        UpdateRemoteInputsEnabled();
        UpdateActionButtons();
        AppendEvent("Ready");

        if (_settings.AutoConnectOnLaunch)
        {
            await ConnectAsync(autoStart: true);
        }
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

    private string CurrentSessionKey
    {
        get
        {
            var value = SessionKeyTextBox.Text.Trim();
            return string.IsNullOrWhiteSpace(value) ? "main" : value;
        }
    }

    private void ModeComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        UpdateRemoteInputsEnabled();
    }

    private async void ConnectButton_Click(object sender, RoutedEventArgs e)
    {
        await ConnectAsync(autoStart: false);
    }

    private async Task ConnectAsync(bool autoStart)
    {
        if (_controlChannel.State == ControlChannelState.Connected ||
            _controlChannel.State == ControlChannelState.Connecting)
        {
            return;
        }

        try
        {
            StatusTextBlock.Text = "Connecting...";
            UpdateActionButtons();

            await SaveSettingsAsync();

            if (SelectedMode == ConnectionMode.Local)
            {
                await _controlChannel.StartAsync(ConnectionMode.Local);
                AppendEvent(autoStart ? "Auto-connect started (local)" : "Connect request sent (local)");
            }
            else
            {
                await _controlChannel.StartAsync(ConnectionMode.Remote, BuildRemoteOptions());
                AppendEvent(
                    autoStart
                        ? $"Auto-connect started (remote: {RemoteUrlTextBox.Text.Trim()})"
                        : $"Connect request sent (remote: {RemoteUrlTextBox.Text.Trim()})");
            }

            await RefreshSessionsAsync();
            await LoadHistoryAsync(clearTimeline: true);
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
            _chatDeltaBuffers.Clear();
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

    private async void RefreshSessionsButton_Click(object sender, RoutedEventArgs e)
    {
        await RefreshSessionsAsync();
    }

    private async Task RefreshSessionsAsync()
    {
        if (!_isConnected || _isLoadingSessions)
            return;

        _isLoadingSessions = true;
        UpdateActionButtons();

        try
        {
            var payload = await _controlChannel.RequestAsync<JsonElement>(
                GatewayMethod.SessionsList,
                new SessionsListParams
                {
                    Limit = 100,
                    IncludeGlobal = true,
                    IncludeUnknown = true,
                    IncludeDerivedTitles = true,
                    IncludeLastMessage = true,
                });

            if (payload.ValueKind != JsonValueKind.Object ||
                !payload.TryGetProperty("sessions", out var sessions) ||
                sessions.ValueKind != JsonValueKind.Array)
            {
                AppendEvent("sessions.list returned no sessions");
                return;
            }

            var currentSession = CurrentSessionKey;
            var items = new List<SessionPickerItem>();

            foreach (var row in sessions.EnumerateArray())
            {
                if (row.ValueKind != JsonValueKind.Object)
                    continue;

                var key = ReadStringProperty(row, "key");
                if (string.IsNullOrWhiteSpace(key))
                    continue;

                var displayName =
                    ReadStringProperty(row, "displayName") ??
                    ReadStringProperty(row, "derivedTitle") ??
                    ReadStringProperty(row, "label") ??
                    key;

                var kind = ReadStringProperty(row, "kind");
                var preview = ReadStringProperty(row, "lastMessagePreview");
                var displayText = displayName;

                if (!string.IsNullOrWhiteSpace(kind) && kind != "direct")
                {
                    displayText = $"[{kind}] {displayText}";
                }
                if (!string.IsNullOrWhiteSpace(preview))
                {
                    displayText = $"{displayText} - {ToSingleLine(preview)}";
                }

                items.Add(new SessionPickerItem
                {
                    Key = key,
                    DisplayName = displayText,
                });
            }

            _isSyncingSessionPicker = true;
            SessionPickerComboBox.ItemsSource = items;

            var selected = items.FirstOrDefault(item => string.Equals(item.Key, currentSession, StringComparison.Ordinal));
            if (selected is not null)
            {
                SessionPickerComboBox.SelectedValue = selected.Key;
            }
            else
            {
                SessionPickerComboBox.SelectedIndex = -1;
            }
            _isSyncingSessionPicker = false;

            AppendEvent($"Loaded {items.Count} sessions");
        }
        catch (Exception ex)
        {
            AppendEvent($"sessions.list failed: {ex.Message}");
            _logger.LogError(ex, "sessions.list failed");
        }
        finally
        {
            _isSyncingSessionPicker = false;
            _isLoadingSessions = false;
            UpdateActionButtons();
        }
    }

    private void SessionPickerComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (_isSyncingSessionPicker)
            return;

        if (SessionPickerComboBox.SelectedItem is not SessionPickerItem selected)
            return;

        SessionKeyTextBox.Text = selected.Key;
        _ = SaveSettingsAsync();
    }

    private async void LoadHistoryButton_Click(object sender, RoutedEventArgs e)
    {
        await LoadHistoryAsync(clearTimeline: true);
    }


    private async void RpcExecuteButton_Click(object sender, RoutedEventArgs e)
    {
        var method = RpcMethodTextBox.Text.Trim();
        if (string.IsNullOrWhiteSpace(method))
        {
            AppendEvent("rpc failed: method is required");
            return;
        }

        if (!_isConnected)
        {
            AppendEvent($"rpc {method} failed: not connected");
            return;
        }

        try
        {
            object? parameters = null;
            var rawParams = RpcParamsTextBox.Text.Trim();
            if (!string.IsNullOrWhiteSpace(rawParams))
            {
                using var doc = JsonDocument.Parse(rawParams);
                parameters = doc.RootElement.Clone();
            }

            var response = await _controlChannel.RequestAsync<JsonElement>(method, parameters);
            if (response.ValueKind == JsonValueKind.Undefined)
            {
                AppendEvent($"rpc {method} => (empty)");
                return;
            }

            var pretty = JsonSerializer.Serialize(response, new JsonSerializerOptions { WriteIndented = true });
            AppendEvent($"rpc {method} =>\n{pretty}");
        }
        catch (Exception ex)
        {
            AppendEvent($"rpc {method} failed: {ex.Message}");
            _logger.LogError(ex, "rpc {Method} failed", method);
        }
    }
    private async Task LoadHistoryAsync(bool clearTimeline)
    {
        if (!_isConnected || _isLoadingHistory)
            return;

        _isLoadingHistory = true;
        UpdateActionButtons();

        var sessionKey = CurrentSessionKey;
        if (clearTimeline)
        {
            ChatListBox.Items.Clear();
        }

        try
        {
            var history = await _controlChannel.RequestAsync<JsonElement>(
                GatewayMethod.ChatHistory,
                new ChatHistoryParams
                {
                    SessionKey = sessionKey,
                    Limit = _settings.HistoryLimit,
                });

            if (history.ValueKind != JsonValueKind.Object ||
                !history.TryGetProperty("messages", out var messages) ||
                messages.ValueKind != JsonValueKind.Array)
            {
                AppendEvent($"chat.history returned no messages for {sessionKey}");
                return;
            }

            var count = 0;
            foreach (var raw in messages.EnumerateArray())
            {
                var (role, text) = ExtractRoleAndText(raw);
                if (string.IsNullOrWhiteSpace(text))
                    continue;

                AppendChat($"{role} [{sessionKey}]", text);
                count++;
            }

            AppendEvent($"Loaded {count} history messages for {sessionKey}");
        }
        catch (Exception ex)
        {
            AppendEvent($"chat.history failed: {ex.Message}");
            _logger.LogError(ex, "chat.history failed");
        }
        finally
        {
            _isLoadingHistory = false;
            UpdateActionButtons();
        }
    }

    private async void SendButton_Click(object sender, RoutedEventArgs e)
    {
        var message = MessageTextBox.Text.Trim();
        if (string.IsNullOrWhiteSpace(message))
            return;

        var sessionKey = CurrentSessionKey;

        try
        {
            var idempotencyKey = $"win-{Guid.NewGuid():N}";
            await _controlChannel.RequestVoidAsync(
                GatewayMethod.ChatSend,
                new ChatSendParams
                {
                    SessionKey = sessionKey,
                    Message = message,
                    IdempotencyKey = idempotencyKey,
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
        _ = Dispatcher.InvokeAsync(async () =>
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

            UpdateRemoteInputsEnabled();
            UpdateActionButtons();

            if (state == ControlChannelState.Connected)
            {
                await RefreshSessionsAsync();
            }
        });
    }

    private void OnSnapshotReceived(HelloOk snapshot)
    {
        _ = Dispatcher.InvokeAsync(async () =>
        {
            var activeSession = snapshot.Snapshot?.ActiveSessionKey;
            if (!string.IsNullOrWhiteSpace(activeSession))
            {
                SessionKeyTextBox.Text = activeSession;
            }

            var sessionCount = snapshot.Snapshot?.Sessions?.Length ?? 0;
            AppendEvent($"snapshot: protocol={snapshot.ProtocolVersion}, sessions={sessionCount}");

            if (_isConnected)
            {
                await RefreshSessionsAsync();
            }
        });
    }

    private void OnChatEventReceived(ChatEvent chat)
    {
        _ = Dispatcher.InvokeAsync(() =>
        {
            var runId = chat.RunId ?? "(unknown-run)";
            var state = (chat.State ?? "delta").Trim().ToLowerInvariant();
            var sessionKey = chat.SessionKey ?? CurrentSessionKey;
            var text = ExtractText(chat.Message);

            switch (state)
            {
                case "delta":
                    if (!string.IsNullOrWhiteSpace(text))
                    {
                        _chatDeltaBuffers[runId] = text;
                        AppendChat($"assistant [{sessionKey}]", text);
                    }
                    break;
                case "final":
                    if (string.IsNullOrWhiteSpace(text) &&
                        _chatDeltaBuffers.TryGetValue(runId, out var buffered))
                    {
                        text = buffered;
                    }
                    _chatDeltaBuffers.Remove(runId);
                    if (!string.IsNullOrWhiteSpace(text))
                    {
                        AppendChat($"assistant [{sessionKey}]", text);
                    }
                    AppendEvent($"chat.final run={ShortId(runId)} seq={chat.Seq}");
                    break;
                case "error":
                    _chatDeltaBuffers.Remove(runId);
                    AppendEvent($"chat.error run={ShortId(runId)}: {chat.ErrorMessage ?? "unknown error"}");
                    break;
                case "aborted":
                    _chatDeltaBuffers.Remove(runId);
                    AppendEvent($"chat.aborted run={ShortId(runId)} reason={chat.StopReason ?? "rpc"}");
                    break;
                default:
                    if (!string.IsNullOrWhiteSpace(text))
                    {
                        AppendChat($"assistant [{sessionKey}]", text);
                    }
                    AppendEvent($"chat.{state} run={ShortId(runId)} seq={chat.Seq}");
                    break;
            }
        });
    }

    private void OnAgentEventReceived(AgentEvent agent)
    {
        _ = Dispatcher.InvokeAsync(() =>
        {
            var stream = string.IsNullOrWhiteSpace(agent.Stream) ? "agent" : agent.Stream;
            var runId = agent.RunId ?? "(unknown-run)";
            var text = ExtractText(agent.Data);

            if (!string.IsNullOrWhiteSpace(text))
            {
                AppendChat($"{stream} [{ShortId(runId)}]", text);
                return;
            }

            var compact = agent.Data.HasValue ? CompactJson(agent.Data.Value) : "(empty)";
            AppendEvent($"agent.{stream} run={ShortId(runId)} seq={agent.Seq}: {compact}");
        });
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
        _settings.SessionKey = CurrentSessionKey;
        _settings.AutoConnectOnLaunch = AutoConnectCheckBox.IsChecked == true;
        _settings.HistoryLimit = Math.Clamp(_settings.HistoryLimit, 1, MaxHistoryLimit);
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

        AutoConnectCheckBox.IsChecked = settings.AutoConnectOnLaunch;

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
        // Mode selection can fire during XAML initialization before fields are ready.
        if (!IsLoaded)
        {
            return;
        }

        var isDisconnected = _controlChannel.State == ControlChannelState.Disconnected;
        var remoteEnabled = SelectedMode == ConnectionMode.Remote && isDisconnected;
        RemoteUrlTextBox.IsEnabled = remoteEnabled;
        RemoteTokenTextBox.IsEnabled = remoteEnabled;
        RemotePasswordBox.IsEnabled = remoteEnabled;
        RemoteDeviceTokenTextBox.IsEnabled = remoteEnabled;
        ModeComboBox.IsEnabled = isDisconnected;
    }

    private void UpdateActionButtons()
    {
        var state = _controlChannel.State;
        ConnectButton.IsEnabled = state == ControlChannelState.Disconnected;
        DisconnectButton.IsEnabled = state != ControlChannelState.Disconnected;
        HealthButton.IsEnabled = _isConnected;
        SendButton.IsEnabled = _isConnected;
        RefreshSessionsButton.IsEnabled = _isConnected && !_isLoadingSessions;
        LoadHistoryButton.IsEnabled = _isConnected && !_isLoadingHistory;
        SessionPickerComboBox.IsEnabled = _isConnected && !_isLoadingSessions;
        RpcMethodTextBox.IsEnabled = _isConnected;
        RpcParamsTextBox.IsEnabled = _isConnected;
        RpcExecuteButton.IsEnabled = _isConnected;
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
            if (listBox.Items.Count > MaxUiListItems)
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

    private static (string Role, string Text) ExtractRoleAndText(JsonElement raw)
    {
        var message = raw;
        if (raw.ValueKind == JsonValueKind.Object &&
            raw.TryGetProperty("message", out var nested) &&
            nested.ValueKind == JsonValueKind.Object)
        {
            message = nested;
        }

        var role = ReadStringProperty(message, "role") ?? "assistant";
        var text = ExtractText(message) ?? string.Empty;
        return (role, text);
    }

    private static string? ExtractText(JsonElement? element)
    {
        if (element is null)
            return null;

        return ExtractText(element.Value);
    }

    private static string? ExtractText(JsonElement element)
    {
        if (element.ValueKind == JsonValueKind.Undefined || element.ValueKind == JsonValueKind.Null)
            return null;

        if (element.ValueKind == JsonValueKind.String)
            return element.GetString();

        if (element.ValueKind != JsonValueKind.Object)
            return null;

        if (element.TryGetProperty("content", out var content))
        {
            var extracted = ExtractContentText(content);
            if (!string.IsNullOrWhiteSpace(extracted))
                return extracted;
        }

        if (element.TryGetProperty("delta", out var delta) &&
            delta.ValueKind == JsonValueKind.String)
        {
            return delta.GetString();
        }

        if (element.TryGetProperty("text", out var textProp) &&
            textProp.ValueKind == JsonValueKind.String)
        {
            return textProp.GetString();
        }

        if (element.TryGetProperty("message", out var nestedMessage))
        {
            var nested = ExtractText(nestedMessage);
            if (!string.IsNullOrWhiteSpace(nested))
                return nested;
        }

        return null;
    }

    private static string? ExtractContentText(JsonElement content)
    {
        if (content.ValueKind == JsonValueKind.String)
            return content.GetString();

        if (content.ValueKind != JsonValueKind.Array)
            return null;

        var sb = new StringBuilder();
        foreach (var part in content.EnumerateArray())
        {
            if (part.ValueKind == JsonValueKind.String)
            {
                var value = part.GetString();
                if (!string.IsNullOrWhiteSpace(value))
                {
                    if (sb.Length > 0)
                        sb.AppendLine();
                    sb.Append(value);
                }
                continue;
            }

            if (part.ValueKind != JsonValueKind.Object)
                continue;

            if (part.TryGetProperty("text", out var text) && text.ValueKind == JsonValueKind.String)
            {
                var value = text.GetString();
                if (!string.IsNullOrWhiteSpace(value))
                {
                    if (sb.Length > 0)
                        sb.AppendLine();
                    sb.Append(value);
                }
            }
        }

        return sb.Length == 0 ? null : sb.ToString();
    }

    private static string? ReadStringProperty(JsonElement element, string propertyName)
    {
        if (element.ValueKind != JsonValueKind.Object)
            return null;

        if (!element.TryGetProperty(propertyName, out var value))
            return null;

        return value.ValueKind switch
        {
            JsonValueKind.String => value.GetString(),
            JsonValueKind.Number or JsonValueKind.True or JsonValueKind.False => value.ToString(),
            _ => null,
        };
    }

    private static string CompactJson(JsonElement element)
    {
        var json = JsonSerializer.Serialize(element, JsonOptions.Default);
        if (json.Length <= 240)
            return json;
        return json[..240] + " ...";
    }

    private static string ShortId(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return "(none)";
        return value.Length <= 8 ? value : value[..8];
    }

    private static string ToSingleLine(string value)
    {
        var single = value.Replace("\r", " ").Replace("\n", " ").Trim();
        if (single.Length <= 600)
            return single;

        return single[..600] + " ...";
    }

    private sealed class SessionPickerItem
    {
        public required string Key { get; init; }
        public required string DisplayName { get; init; }
    }
}




