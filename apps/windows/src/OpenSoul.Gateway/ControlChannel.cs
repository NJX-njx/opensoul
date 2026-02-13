using System.Text.Json;
using Microsoft.Extensions.Logging;
using OpenSoul.Protocol;

namespace OpenSoul.Gateway;

/// <summary>
/// High-level control channel that manages the gateway connection lifecycle,
/// routes events, and maintains connection health.
/// Mirrors ControlChannel.swift.
/// </summary>
public sealed class ControlChannel : IAsyncDisposable
{
    private readonly ILogger<ControlChannel> _logger;
    private readonly GatewayConnection _connection;
    private readonly GatewayProcessManager _processManager;

    private IDisposable? _subscription;
    private bool _disposed;

    public ControlChannel(
        ILogger<ControlChannel> logger,
        GatewayConnection connection,
        GatewayProcessManager processManager)
    {
        _logger = logger;
        _connection = connection;
        _processManager = processManager;

        _connection.StateChanged += OnConnectionStateChanged;
        _processManager.StatusChanged += OnGatewayStatusChanged;
    }

    public event Action<ControlChannelState>? StateChanged;
    public event Action<AgentEvent>? AgentEventReceived;
    public event Action<ChatEvent>? ChatEventReceived;
    public event Action<string>? ShutdownReceived;
    public event Action<ExecApprovalRequestParams>? ExecApprovalRequested;
    public event Action<DevicePairRequestedEvent>? DevicePairRequested;
    public event Action? TickReceived;
    public event Action<HelloOk>? SnapshotReceived;

    public ControlChannelState State { get; private set; } = ControlChannelState.Disconnected;

    /// <summary>The underlying gateway connection.</summary>
    public GatewayConnection Connection => _connection;

    /// <summary>The gateway process manager.</summary>
    public GatewayProcessManager ProcessManager => _processManager;

    /// <summary>
    /// Start the control channel: launch gateway if needed, then connect.
    /// </summary>
    public async Task StartAsync(ConnectionMode mode, RemoteConnectionOptions? remote = null, CancellationToken ct = default)
    {
        SetState(ControlChannelState.Connecting);

        if (mode == ConnectionMode.Local)
        {
            // Start local gateway
            await _processManager.StartAsync(ct);

            if (_processManager.WebSocketUrl is null)
            {
                _logger.LogError("Gateway started but no WebSocket URL available");
                SetState(ControlChannelState.Disconnected);
                return;
            }

            _connection.Configure(() => new GatewayConnectionConfig
            {
                Url = _processManager.WebSocketUrl,
            });
        }
        else if (mode == ConnectionMode.Remote)
        {
            var resolvedConfig = ResolveRemoteConfig(remote);
            if (resolvedConfig is null)
            {
                SetState(ControlChannelState.Disconnected);
                return;
            }

            _logger.LogInformation("Using remote gateway endpoint {Url}", resolvedConfig.Url);
            _connection.Configure(() => resolvedConfig);
        }
        else
        {
            _logger.LogWarning("Control channel cannot start in unconfigured mode");
            SetState(ControlChannelState.Disconnected);
            return;
        }

        _subscription?.Dispose();
        _subscription = _connection.Subscribe(HandlePushAsync);

        await _connection.StartAsync(ct);
    }

    /// <summary>
    /// Stop the control channel and optionally stop the gateway.
    /// </summary>
    public async Task StopAsync(bool stopGateway = false)
    {
        _subscription?.Dispose();
        _subscription = null;

        await _connection.StopAsync();

        if (stopGateway)
        {
            await _processManager.StopAsync();
        }

        SetState(ControlChannelState.Disconnected);
    }

    public Task<T?> RequestAsync<T>(string method, object? parameters = null, CancellationToken ct = default)
        => _connection.RequestAsync<T>(method, parameters, ct);

    public Task RequestVoidAsync(string method, object? parameters = null, CancellationToken ct = default)
        => _connection.RequestVoidAsync(method, parameters, ct);

    public async ValueTask DisposeAsync()
    {
        if (_disposed) return;
        _disposed = true;

        _connection.StateChanged -= OnConnectionStateChanged;
        _processManager.StatusChanged -= OnGatewayStatusChanged;
        _subscription?.Dispose();
        await _connection.DisposeAsync();
        await _processManager.DisposeAsync();
    }

    private async Task HandlePushAsync(GatewayPush push)
    {
        switch (push)
        {
            case GatewayPush.SnapshotPush snapshot:
                _logger.LogInformation("Received snapshot (v{Version})", snapshot.Hello.ProtocolVersion);
                SnapshotReceived?.Invoke(snapshot.Hello);
                break;

            case GatewayPush.EventPush eventPush:
                await RouteEventAsync(eventPush.Frame);
                break;
        }
    }

    private Task RouteEventAsync(EventFrame frame)
    {
        try
        {
            switch (frame.Event)
            {
                case GatewayEvent.Agent:
                    if (frame.Payload is { } agentPayload)
                    {
                        var agentEvent = JsonSerializer.Deserialize<AgentEvent>(agentPayload, JsonOptions.Default);
                        if (agentEvent is not null)
                            AgentEventReceived?.Invoke(agentEvent);
                    }
                    break;

                case GatewayEvent.Chat:
                    if (frame.Payload is { } chatPayload)
                    {
                        var chatEvent = JsonSerializer.Deserialize<ChatEvent>(chatPayload, JsonOptions.Default);
                        if (chatEvent is not null)
                            ChatEventReceived?.Invoke(chatEvent);
                    }
                    break;

                case GatewayEvent.Tick:
                    TickReceived?.Invoke();
                    break;

                case GatewayEvent.Shutdown:
                    var reason = "unknown";
                    if (frame.Payload is { } shutdownPayload)
                    {
                        var shutdownEvent = JsonSerializer.Deserialize<ShutdownEvent>(shutdownPayload, JsonOptions.Default);
                        reason = shutdownEvent?.Reason ?? reason;
                    }
                    _logger.LogInformation("Gateway shutdown: {Reason}", reason);
                    ShutdownReceived?.Invoke(reason);
                    break;

                case GatewayEvent.ExecApprovalRequested:
                    if (frame.Payload is { } execPayload)
                    {
                        var execRequest = JsonSerializer.Deserialize<ExecApprovalRequestParams>(execPayload, JsonOptions.Default);
                        if (execRequest is not null)
                            ExecApprovalRequested?.Invoke(execRequest);
                    }
                    break;

                case GatewayEvent.DevicePairRequested:
                    if (frame.Payload is { } pairPayload)
                    {
                        var pairRequest = JsonSerializer.Deserialize<DevicePairRequestedEvent>(pairPayload, JsonOptions.Default);
                        if (pairRequest is not null)
                            DevicePairRequested?.Invoke(pairRequest);
                    }
                    break;

                default:
                    _logger.LogDebug("Unhandled event: {Event}", frame.Event);
                    break;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error routing event {Event}", frame.Event);
        }

        return Task.CompletedTask;
    }

    private void OnConnectionStateChanged(GatewayChannelState channelState)
    {
        var state = channelState switch
        {
            GatewayChannelState.Connected => ControlChannelState.Connected,
            GatewayChannelState.Connecting => ControlChannelState.Connecting,
            _ => ControlChannelState.Disconnected,
        };
        SetState(state);
    }

    private void OnGatewayStatusChanged(GatewayStatus gatewayStatus)
    {
        if (gatewayStatus == GatewayStatus.Failed)
        {
            SetState(ControlChannelState.Degraded);
        }
    }

    private void SetState(ControlChannelState state)
    {
        if (State == state) return;
        State = state;
        _logger.LogInformation("Control channel state: {State}", state);
        StateChanged?.Invoke(state);
    }

    private GatewayConnectionConfig? ResolveRemoteConfig(RemoteConnectionOptions? remote)
    {
        var rawUrl = FirstNonEmpty(
            remote?.Url,
            Environment.GetEnvironmentVariable(GatewayConstants.EnvRemoteGatewayUrl),
            Environment.GetEnvironmentVariable(GatewayConstants.EnvGatewayUrl));

        if (rawUrl is null)
        {
            _logger.LogError(
                "Remote mode requires a gateway URL. Set {RemoteUrlEnv} or provide options.",
                GatewayConstants.EnvRemoteGatewayUrl);
            return null;
        }

        if (!TryNormalizeWebSocketUrl(rawUrl, out var normalizedUrl))
        {
            _logger.LogError("Remote gateway URL is invalid: {Url}", rawUrl);
            return null;
        }

        return new GatewayConnectionConfig
        {
            Url = normalizedUrl,
            Token = FirstNonEmpty(
                remote?.Token,
                Environment.GetEnvironmentVariable(GatewayConstants.EnvRemoteGatewayToken),
                Environment.GetEnvironmentVariable(GatewayConstants.EnvGatewayToken)),
            Password = FirstNonEmpty(
                remote?.Password,
                Environment.GetEnvironmentVariable(GatewayConstants.EnvRemoteGatewayPassword),
                Environment.GetEnvironmentVariable(GatewayConstants.EnvGatewayPassword)),
            DeviceToken = FirstNonEmpty(
                remote?.DeviceToken,
                Environment.GetEnvironmentVariable(GatewayConstants.EnvRemoteGatewayDeviceToken)),
        };
    }

    private static string? FirstNonEmpty(params string?[] values)
    {
        foreach (var value in values)
        {
            var trimmed = value?.Trim();
            if (!string.IsNullOrWhiteSpace(trimmed))
                return trimmed;
        }

        return null;
    }

    private static bool TryNormalizeWebSocketUrl(string input, out string normalized)
    {
        normalized = input.Trim();

        if (normalized.StartsWith("http://", StringComparison.OrdinalIgnoreCase))
        {
            normalized = $"ws://{normalized["http://".Length..]}";
        }
        else if (normalized.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
        {
            normalized = $"wss://{normalized["https://".Length..]}";
        }
        else if (!normalized.Contains("://", StringComparison.Ordinal))
        {
            normalized = $"ws://{normalized}";
        }

        return Uri.TryCreate(normalized, UriKind.Absolute, out var uri) &&
            (uri.Scheme == Uri.UriSchemeWs || uri.Scheme == Uri.UriSchemeWss);
    }
}

public enum ControlChannelState
{
    Disconnected,
    Connecting,
    Connected,
    Degraded,
}

public enum ConnectionMode
{
    Local,
    Remote,
    Unconfigured,
}

public sealed record RemoteConnectionOptions
{
    public string? Url { get; init; }
    public string? Token { get; init; }
    public string? Password { get; init; }
    public string? DeviceToken { get; init; }
}