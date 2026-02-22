using System.Collections.Concurrent;
using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using OpenSoul.Protocol;

namespace OpenSoul.Gateway;

/// <summary>
/// Low-level WebSocket client for the OpenSoul Gateway.
/// Mirrors GatewayChannelActor from Swift 闂?handles connect, send, receive,
/// reconnect with exponential backoff, and request/response correlation.
/// Thread-safe via ConcurrentDictionary and SemaphoreSlim.
/// </summary>
public sealed class GatewayChannel : IAsyncDisposable
{
    private readonly ILogger<GatewayChannel> _logger;
    private readonly SemaphoreSlim _connectLock = new(1, 1);
    private readonly ConcurrentDictionary<string, TaskCompletionSource<ResponseFrame>> _pending = new();
    private readonly List<Func<GatewayPush, Task>> _subscribers = [];
    private readonly object _subscriberLock = new();

    private ClientWebSocket? _ws;
    private CancellationTokenSource? _receiveCts;
    private Task? _receiveTask;
    private int _requestCounter;
    private bool _disposed;

    // Reconnect state
    private int _reconnectAttempt;
    private const int MaxReconnectDelay = 30_000;
    // Aggressive initial reconnect: loopback connections are instant when the
    // gateway is alive, so we retry quickly at first and ramp up gradually.
    private static readonly int[] BackoffMs = [100, 250, 500, 1000, 2000, 5000, 10_000, 20_000];

    public GatewayChannel(ILogger<GatewayChannel> logger)
    {
        _logger = logger;
    }

    /// <summary>Raised when the connection state changes.</summary>
    public event Action<GatewayChannelState>? StateChanged;

    /// <summary>Current connection state.</summary>
    public GatewayChannelState State { get; private set; } = GatewayChannelState.Disconnected;

    /// <summary>The most recent HelloOk snapshot received on connect.</summary>
    public HelloOk? LastSnapshot { get; private set; }

    /// <summary>
    /// Connect to the gateway WebSocket endpoint.
    /// Sends ConnectParams as the first message and awaits HelloOk.
    /// </summary>
    public async Task<HelloOk?> ConnectAsync(GatewayConnectionConfig config, CancellationToken ct = default)
    {
        await _connectLock.WaitAsync(ct);
        try
        {
            await DisconnectInternalAsync();

            SetState(GatewayChannelState.Connecting);
            _logger.LogInformation("Connecting to gateway at {Url}", config.Url);

            _ws = new ClientWebSocket();
            _ws.Options.SetRequestHeader("User-Agent", "OpenSoul-Windows/0.1.0");

            var uri = new Uri(config.Url);
            if (IsLoopbackHost(uri.Host))
            {
                // Bypass system proxy/TUN for local gateway connections.
                _ws.Options.Proxy = null;
            }
            await _ws.ConnectAsync(uri, ct);

            // Send handshake request (method=connect) and wait for hello-ok response.
            var connectRequestId = Guid.NewGuid().ToString("N");
            var connectParams = BuildConnectParams(config);
            var connectFrame = new RequestFrame
            {
                Id = connectRequestId,
                Method = "connect",
                Params = JsonSerializer.SerializeToElement(connectParams, JsonOptions.Default),
            };

            await SendRawAsync(connectFrame, ct);

            using var connectTimeout = CancellationTokenSource.CreateLinkedTokenSource(ct);
            connectTimeout.CancelAfter(TimeSpan.FromSeconds(8));

            var hello = await ReadConnectHelloAsync(connectRequestId, connectTimeout.Token);
            if (hello is null)
            {
                _logger.LogWarning("Gateway did not send a hello snapshot after connect");
                SetState(GatewayChannelState.Disconnected);
                return null;
            }

            LastSnapshot = hello;
            _reconnectAttempt = 0;
            SetState(GatewayChannelState.Connected);

            // Start receive loop
            _receiveCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            _receiveTask = Task.Run(() => ReceiveLoopAsync(_receiveCts.Token), _receiveCts.Token);

            // Broadcast snapshot
            await BroadcastAsync(new GatewayPush.SnapshotPush(hello));

            _logger.LogInformation("Connected to gateway v{Version}", hello.ServerVersion);
            return hello;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to connect to gateway");
            SetState(GatewayChannelState.Disconnected);
            throw;
        }
        finally
        {
            _connectLock.Release();
        }
    }

    /// <summary>
    /// Send a request and await the response.
    /// </summary>
    public async Task<ResponseFrame> RequestAsync(string method, object? parameters = null, TimeSpan? timeout = null, CancellationToken ct = default)
    {
        if (_ws?.State != WebSocketState.Open)
            throw new InvalidOperationException("WebSocket is not connected");

        var id = Interlocked.Increment(ref _requestCounter).ToString();
        var tcs = new TaskCompletionSource<ResponseFrame>(TaskCreationOptions.RunContinuationsAsynchronously);
        _pending[id] = tcs;

        try
        {
            var frame = new RequestFrame
            {
                Id = id,
                Method = method,
                Params = parameters is not null
                    ? JsonSerializer.SerializeToElement(parameters, JsonOptions.Default)
                    : null,
            };

            var json = JsonSerializer.Serialize(frame, JsonOptions.Default);
            var bytes = Encoding.UTF8.GetBytes(json);
            await _ws.SendAsync(bytes, WebSocketMessageType.Text, true, ct);

            var effectiveTimeout = timeout ?? TimeSpan.FromSeconds(30);
            using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            cts.CancelAfter(effectiveTimeout);

            using (cts.Token.Register(() => tcs.TrySetCanceled()))
            {
                return await tcs.Task;
            }
        }
        finally
        {
            _pending.TryRemove(id, out _);
        }
    }

    /// <summary>
    /// Send a request and deserialize the response payload.
    /// </summary>
    public async Task<T?> RequestAsync<T>(string method, object? parameters = null, TimeSpan? timeout = null, CancellationToken ct = default)
    {
        var response = await RequestAsync(method, parameters, timeout, ct);

        if (!response.Ok)
        {
            throw new GatewayRequestException(method, response.Error);
        }

        if (response.Payload is null || response.Payload.Value.ValueKind == JsonValueKind.Null)
            return default;

        return JsonSerializer.Deserialize<T>(response.Payload.Value, JsonOptions.Default);
    }

    /// <summary>
    /// Send a void request (no response payload expected).
    /// </summary>
    public async Task RequestVoidAsync(string method, object? parameters = null, TimeSpan? timeout = null, CancellationToken ct = default)
    {
        var response = await RequestAsync(method, parameters, timeout, ct);
        if (!response.Ok)
        {
            throw new GatewayRequestException(method, response.Error);
        }
    }

    /// <summary>
    /// Subscribe to gateway push events (snapshot + event frames).
    /// </summary>
    public IDisposable Subscribe(Func<GatewayPush, Task> handler)
    {
        lock (_subscriberLock)
        {
            _subscribers.Add(handler);
        }

        return new Unsubscriber(() =>
        {
            lock (_subscriberLock)
            {
                _subscribers.Remove(handler);
            }
        });
    }

    /// <summary>
    /// Disconnect from the gateway.
    /// </summary>
    public async Task DisconnectAsync()
    {
        await _connectLock.WaitAsync();
        try
        {
            await DisconnectInternalAsync();
        }
        finally
        {
            _connectLock.Release();
        }
    }

    /// <summary>
    /// Attempt reconnect with exponential backoff.
    /// </summary>
    public async Task<HelloOk?> ReconnectAsync(GatewayConnectionConfig config, CancellationToken ct = default)
    {
        var delay = _reconnectAttempt < BackoffMs.Length
            ? BackoffMs[_reconnectAttempt]
            : MaxReconnectDelay;

        _reconnectAttempt++;
        _logger.LogInformation("Reconnecting in {Delay}ms (attempt {Attempt})", delay, _reconnectAttempt);

        await Task.Delay(delay, ct);
        return await ConnectAsync(config, ct);
    }

    public async ValueTask DisposeAsync()
    {
        if (_disposed) return;
        _disposed = true;

        await DisconnectInternalAsync();
        _connectLock.Dispose();
    }

    // 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洦鍨跺畷绋课旈埀顒勫磼閵婏妇绡€濠电姴鍊绘晶鏇犵棯閹岀吋闁哄瞼鍠栧畷婊嗩槾閻㈩垱鐩弻锝夊箻閸愬弶娈婚梺鍝勬湰缁嬫牜绮诲☉銏犵闁告劏鏁╅敂鐣岀?Private 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洦鍨跺畷绋课旈埀顒勫磼閵婏妇绡€濠电姴鍊绘晶鏇犵棯閹岀吋闁哄瞼鍠栧畷婊嗩槾閻㈩垱鐩弻锝夊箻閸愬弶娈婚梺鍝勬湰缁嬫牜绮诲☉銏犵闁告劏鏁╅敂鐣岀閻庢稒顭囬惌鎺旂磼閻樺磭澧い顐㈢箰鐓ゆい蹇撳椤︺劑姊洪崷顓犲笡閻㈩垱甯楀蹇涘川鐎涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€?

    private async Task DisconnectInternalAsync()
    {
        _receiveCts?.Cancel();

        if (_ws is { State: WebSocketState.Open or WebSocketState.CloseReceived })
        {
            try
            {
                await _ws.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
            }
            catch { /* best effort */ }
        }

        if (_receiveTask is not null)
        {
            try { await _receiveTask; } catch { /* ignore */ }
        }

        _ws?.Dispose();
        _ws = null;
        _receiveCts?.Dispose();
        _receiveCts = null;
        _receiveTask = null;

        // Cancel all pending requests
        foreach (var kvp in _pending)
        {
            kvp.Value.TrySetCanceled();
        }
        _pending.Clear();

        SetState(GatewayChannelState.Disconnected);
    }

    private async Task ReceiveLoopAsync(CancellationToken ct)
    {
        try
        {
            while (!ct.IsCancellationRequested && _ws?.State == WebSocketState.Open)
            {
                var json = await ReceiveOneAsync(ct);
                if (json is null)
                {
                    if (_ws?.State == WebSocketState.Open)
                    {
                        continue;
                    }

                    break;
                }

                await HandleMessageAsync(json);
            }
        }
        catch (OperationCanceledException) { /* normal */ }
        catch (WebSocketException ex)
        {
            _logger.LogWarning(ex, "WebSocket error in receive loop");
        }
        finally
        {
            SetState(GatewayChannelState.Disconnected);
        }
    }

    private async Task HandleMessageAsync(string json)
    {
        try
        {
            using var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;

            if (!root.TryGetProperty("type", out var typeProp))
                return;

            var type = typeProp.GetString();

            switch (type)
            {
                case "res":
                    HandleResponse(root, json);
                    break;

                case "event":
                    await HandleEventAsync(root, json);
                    break;

                case "req":
                    // Server-to-client requests (rare; log and ignore for now)
                    _logger.LogDebug("Received server request: {Json}", json);
                    break;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error handling gateway message");
        }
    }

    private void HandleResponse(JsonElement root, string json)
    {
        if (!root.TryGetProperty("id", out var idProp))
            return;

        var id = idProp.GetString();
        if (id is null) return;

        if (_pending.TryRemove(id, out var tcs))
        {
            var response = JsonSerializer.Deserialize<ResponseFrame>(json, JsonOptions.Default);
            if (response is not null)
            {
                tcs.TrySetResult(response);
            }
        }
    }

    private async Task HandleEventAsync(JsonElement root, string json)
    {
        if (!root.TryGetProperty("event", out var eventProp))
            return;

        var eventName = eventProp.GetString();
        var frame = JsonSerializer.Deserialize<EventFrame>(json, JsonOptions.Default);

        if (frame is not null)
        {
            await BroadcastAsync(new GatewayPush.EventPush(frame));
        }
    }

    private async Task BroadcastAsync(GatewayPush push)
    {
        Func<GatewayPush, Task>[] handlers;
        lock (_subscriberLock)
        {
            handlers = [.. _subscribers];
        }

        foreach (var handler in handlers)
        {
            try
            {
                await handler(push);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in push handler");
            }
        }
    }

    private async Task SendRawAsync<T>(T obj, CancellationToken ct)
    {
        if (_ws?.State != WebSocketState.Open)
            throw new InvalidOperationException("WebSocket is not connected");

        var json = JsonSerializer.Serialize(obj, JsonOptions.Default);
        var bytes = Encoding.UTF8.GetBytes(json);
        await _ws.SendAsync(bytes, WebSocketMessageType.Text, true, ct);
    }

    private async Task<string?> ReceiveOneAsync(CancellationToken ct)
    {
        if (_ws is null) return null;

        // The gateway can send fragmented WebSocket messages for larger payloads.
        // Read until EndOfMessage to avoid truncating JSON frames.
        var buffer = new byte[16 * 1024];
        using var stream = new MemoryStream();

        while (!ct.IsCancellationRequested && _ws.State is WebSocketState.Open or WebSocketState.CloseReceived)
        {
            var result = await _ws.ReceiveAsync(buffer, ct);

            if (result.MessageType == WebSocketMessageType.Close)
            {
                _logger.LogInformation("Gateway closed connection: {Reason}", result.CloseStatusDescription);
                return null;
            }

            if (result.Count > 0)
            {
                stream.Write(buffer, 0, result.Count);
            }

            if (!result.EndOfMessage)
            {
                continue;
            }

            if (result.MessageType != WebSocketMessageType.Text)
            {
                return null;
            }

            if (stream.Length > GatewayConstants.MaxMessageSize)
            {
                throw new InvalidOperationException(
                    $"Gateway message exceeded {GatewayConstants.MaxMessageSize} bytes.");
            }

            return Encoding.UTF8.GetString(stream.GetBuffer(), 0, (int)stream.Length);
        }

        return null;
    }

    private static object BuildConnectParams(GatewayConnectionConfig config)
    {
        return new
        {
            minProtocol = GatewayConstants.ProtocolVersion,
            maxProtocol = GatewayConstants.ProtocolVersion,
            client = new
            {
                id = "gateway-client",
                displayName = Environment.MachineName,
                version = "0.1.0",
                platform = "windows",
                mode = "ui",
            },
            role = "operator",
            scopes = new[] { "operator.admin", "operator.approvals", "operator.pairing" },
            auth = BuildConnectAuth(config),
        };
    }

    private static object? BuildConnectAuth(GatewayConnectionConfig config)
    {
        var token = config.DeviceToken ?? config.Token;
        if (!string.IsNullOrWhiteSpace(token))
            return new { token };
        if (!string.IsNullOrWhiteSpace(config.Password))
            return new { password = config.Password };
        return null;
    }

    private async Task<HelloOk?> ReadConnectHelloAsync(string connectRequestId, CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            var frameJson = await ReceiveOneAsync(ct);
            if (frameJson is null)
                return null;

            using var doc = JsonDocument.Parse(frameJson);
            if (!doc.RootElement.TryGetProperty("type", out var typeProp))
                continue;

            var type = typeProp.GetString();
            if (string.Equals(type, "event", StringComparison.Ordinal))
            {
                // Ignore connect.challenge and any pre-connect events.
                continue;
            }

            if (!string.Equals(type, "res", StringComparison.Ordinal))
                continue;

            var response = JsonSerializer.Deserialize<ResponseFrame>(frameJson, JsonOptions.Default);
            if (response is null)
                continue;

            if (!string.Equals(response.Id, connectRequestId, StringComparison.Ordinal))
                continue;

            if (!response.Ok)
            {
                var message = response.Error?.Message ?? "gateway connect rejected";
                throw new InvalidOperationException(message);
            }

            if (response.Payload is null)
                return null;

            return JsonSerializer.Deserialize<HelloOk>(response.Payload.Value.GetRawText(), JsonOptions.Default);
        }

        return null;
    }

    private static bool IsLoopbackHost(string host)
    {
        if (string.Equals(host, "localhost", StringComparison.OrdinalIgnoreCase))
            return true;
        if (IPAddress.TryParse(host, out var ip))
            return IPAddress.IsLoopback(ip);
        return false;
    }

    private void SetState(GatewayChannelState state)
    {
        if (State == state) return;
        State = state;
        StateChanged?.Invoke(state);
    }

    private sealed class Unsubscriber(Action onDispose) : IDisposable
    {
        public void Dispose() => onDispose();
    }
}

// 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洦鍨跺畷绋课旈埀顒勫磼閵婏妇绡€濠电姴鍊绘晶鏇犵棯閹岀吋闁哄瞼鍠栧畷婊嗩槾閻㈩垱鐩弻锝夊箻閸愬弶娈婚梺鍝勬湰缁嬫牜绮诲☉銏犵闁告劏鏁╅敂鐣岀?Supporting types 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洦鍨跺畷绋课旈埀顒勫磼閵婏妇绡€濠电姴鍊绘晶鏇犵棯閹岀吋闁哄瞼鍠栧畷婊嗩槾閻㈩垱鐩弻锝夊箻閸愬弶娈婚梺鍝勬湰缁嬫牜绮诲☉銏犵闁告劏鏁╅敂鐣岀閻庢稒顭囬惌鎺旂磼閻樺磭澧い顐㈢箰鐓ゆい蹇撳椤︺劑姊洪崷顓犲笡閻㈩垱甯楀蹇涘川鐎涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰鹃梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼闂佸搫妫濇禍鍫曞蓟濞戞鐔兼嚒閵堝洨鍘滈柣搴ゎ潐濞叉﹢宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯堕悽顖涱殜濮婄粯鎷呮笟顖滃姼缂備胶绮崝娆掓濡炪倖鐗楃粙鎾汇€呴幓鎹ㄦ棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟濞戙垹绠涙い鎾跺仧缁佺兘鏌ｉ姀鈺佺仜闁告梹鍨垮璇测槈濮橈絽浜鹃柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閿涘嫪娌柣锝呯潡瑜忛埀顒冾潐濞叉﹢銆冮崱妤婂殫闁告洦鍓涚弧鈧繛杈剧到婢瑰﹤螞濠婂牊鈷掗柛灞捐壘閳ь剟顥撶划鍫熺瑹閳ь剙鐣烽鐐查敜婵°倐鍋撻柛灞诲妽缁绘繃绻濋崒婊冾暫缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓熼柟鎯у暱閺嗭綁鏌＄仦鍓ь灱缂佺姵鐩獮娆撳礃閳诡剨闄勭换娑氣偓娑欘焽閻帞绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚ˇ銊╂⒑閸︻厾甯涢悽顖涘笚濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯尖偓娈垮枦椤曆囶敇閸忕厧绶炲┑鐘插濡差垰鈹戦悩顔肩伇婵炲鐩弫鍐晲閸℃瑧褰?

public enum GatewayChannelState
{
    Disconnected,
    Connecting,
    Connected,
}

public sealed record GatewayConnectionConfig
{
    public required string Url { get; init; }
    public string? Token { get; init; }
    public string? Password { get; init; }
    public string? DeviceToken { get; init; }
}

/// <summary>
/// Push messages received from the gateway (either initial snapshot or event).
/// </summary>
public abstract record GatewayPush
{
    public sealed record SnapshotPush(HelloOk Hello) : GatewayPush;
    public sealed record EventPush(EventFrame Frame) : GatewayPush;
}

public sealed class GatewayRequestException : Exception
{
    public string Method { get; }
    public ErrorShape? ErrorShape { get; }

    public GatewayRequestException(string method, ErrorShape? error)
        : base($"Gateway request '{method}' failed: {error?.Message ?? "unknown error"} ({error?.Code})")
    {
        Method = method;
        ErrorShape = error;
    }
}
