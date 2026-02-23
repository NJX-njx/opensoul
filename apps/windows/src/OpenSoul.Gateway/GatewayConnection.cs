using System.Text.Json;
using Microsoft.Extensions.Logging;
using OpenSoul.Protocol;

namespace OpenSoul.Gateway;

/// <summary>
/// High-level gateway connection manager (singleton).
/// Mirrors GatewayConnection.swift — wraps GatewayChannel with auto-retry,
/// config resolution, and connection lifecycle management.
/// </summary>
public sealed class GatewayConnection : IAsyncDisposable
{
    private readonly ILogger<GatewayConnection> _logger;
    private readonly GatewayChannel _channel;
    private readonly SemaphoreSlim _opLock = new(1, 1);
    private readonly object _reconnectLoopLock = new();

    private Func<GatewayConnectionConfig>? _configProvider;
    private CancellationTokenSource? _connectionCts;
    private Task? _reconnectLoopTask;
    private bool _disposed;

    public GatewayConnection(ILogger<GatewayConnection> logger, ILogger<GatewayChannel> channelLogger)
    {
        _logger = logger;
        _channel = new GatewayChannel(channelLogger);
        _channel.StateChanged += OnChannelStateChanged;
    }

    /// <summary>Channel-level state changes.</summary>
    public event Action<GatewayChannelState>? StateChanged;

    /// <summary>Current connection state.</summary>
    public GatewayChannelState State => _channel.State;

    /// <summary>Last snapshot received from the gateway.</summary>
    public HelloOk? LastSnapshot => _channel.LastSnapshot;

    /// <summary>The main session key from the last snapshot.</summary>
    public string? MainSessionKey => LastSnapshot?.Snapshot?.ActiveSessionKey
        ?? LastSnapshot?.Snapshot?.Sessions?.FirstOrDefault()?.Key;

    /// <summary>
    /// Configure the connection config provider.
    /// </summary>
    public void Configure(Func<GatewayConnectionConfig> configProvider)
    {
        _configProvider = configProvider;
    }

    /// <summary>
    /// Start the connection. Connects and begins auto-reconnect loop.
    /// </summary>
    public async Task StartAsync(CancellationToken ct = default)
    {
        if (_configProvider is null)
            throw new InvalidOperationException("GatewayConnection not configured. Call Configure() first.");

        _connectionCts?.Cancel();
        _connectionCts?.Dispose();
        _connectionCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        var config = _configProvider();

        try
        {
            await _channel.ConnectAsync(config, _connectionCts.Token);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Initial connection failed, will retry");
            EnsureReconnectLoopRunning(_connectionCts.Token);
        }
    }

    /// <summary>
    /// Stop the connection.
    /// </summary>
    public async Task StopAsync()
    {
        _connectionCts?.Cancel();
        var reconnectTask = GetReconnectLoopTask();
        if (reconnectTask is not null)
        {
            try
            {
                await reconnectTask;
            }
            catch (OperationCanceledException)
            {
                // expected during stop
            }
        }
        await _channel.DisconnectAsync();
    }

    /// <summary>
    /// Send a request and await typed response.
    /// Auto-retries once if connection dropped.
    /// </summary>
    public async Task<T?> RequestAsync<T>(string method, object? parameters = null, CancellationToken ct = default)
    {
        try
        {
            return await _channel.RequestAsync<T>(method, parameters, ct: ct);
        }
        catch (Exception) when (_channel.State != GatewayChannelState.Connected)
        {
            // Try reconnecting once
            await EnsureConnectedAsync(ct);
            return await _channel.RequestAsync<T>(method, parameters, ct: ct);
        }
    }

    /// <summary>
    /// Send a request and get the raw response.
    /// </summary>
    public async Task<ResponseFrame> RequestRawAsync(string method, object? parameters = null, CancellationToken ct = default)
    {
        try
        {
            return await _channel.RequestAsync(method, parameters, ct: ct);
        }
        catch (Exception) when (_channel.State != GatewayChannelState.Connected)
        {
            await EnsureConnectedAsync(ct);
            return await _channel.RequestAsync(method, parameters, ct: ct);
        }
    }

    /// <summary>
    /// Send a void request (no response payload).
    /// </summary>
    public async Task RequestVoidAsync(string method, object? parameters = null, CancellationToken ct = default)
    {
        try
        {
            await _channel.RequestVoidAsync(method, parameters, ct: ct);
        }
        catch (Exception) when (_channel.State != GatewayChannelState.Connected)
        {
            await EnsureConnectedAsync(ct);
            await _channel.RequestVoidAsync(method, parameters, ct: ct);
        }
    }

    /// <summary>
    /// Subscribe to gateway push events.
    /// </summary>
    public IDisposable Subscribe(Func<GatewayPush, Task> handler)
        => _channel.Subscribe(handler);

    public async ValueTask DisposeAsync()
    {
        if (_disposed) return;
        _disposed = true;

        _connectionCts?.Cancel();
        _connectionCts?.Dispose();
        var reconnectTask = GetReconnectLoopTask();
        if (reconnectTask is not null)
        {
            try
            {
                await reconnectTask;
            }
            catch (OperationCanceledException)
            {
                // expected during dispose
            }
        }
        _channel.StateChanged -= OnChannelStateChanged;
        await _channel.DisposeAsync();
        _opLock.Dispose();
    }

    // ── Private ──────────────────────────────────────────────────────

    private async Task EnsureConnectedAsync(CancellationToken ct)
    {
        if (_channel.State == GatewayChannelState.Connected) return;
        if (_configProvider is null) return;

        await _opLock.WaitAsync(ct);
        try
        {
            if (_channel.State == GatewayChannelState.Connected) return;
            var config = _configProvider();
            await _channel.ConnectAsync(config, ct);
        }
        finally
        {
            _opLock.Release();
        }
    }

    private async Task AutoReconnectLoopAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            try
            {
                if (_channel.State == GatewayChannelState.Connected)
                {
                    return;
                }
                if (_configProvider is null) break;
                var config = _configProvider();
                await _channel.ReconnectAsync(config, ct);

                if (_channel.State == GatewayChannelState.Connected)
                {
                    _logger.LogInformation("Reconnected to gateway");
                    return; // reconnected successfully
                }
            }
            catch (OperationCanceledException)
            {
                return;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Reconnect attempt failed");
            }
        }
    }

    private void OnChannelStateChanged(GatewayChannelState state)
    {
        StateChanged?.Invoke(state);

        if (state == GatewayChannelState.Disconnected && _connectionCts is { IsCancellationRequested: false })
        {
            // Auto-reconnect
            EnsureReconnectLoopRunning(_connectionCts.Token);
        }
    }

    private void EnsureReconnectLoopRunning(CancellationToken ct)
    {
        if (ct.IsCancellationRequested)
        {
            return;
        }

        lock (_reconnectLoopLock)
        {
            if (_reconnectLoopTask is { IsCompleted: false })
            {
                return;
            }

            _reconnectLoopTask = AutoReconnectLoopAsync(ct);
        }
    }

    private Task? GetReconnectLoopTask()
    {
        lock (_reconnectLoopLock)
        {
            return _reconnectLoopTask;
        }
    }
}
