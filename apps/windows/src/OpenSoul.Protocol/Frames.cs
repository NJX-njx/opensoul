using System.Text.Json;
using System.Text.Json.Serialization;

namespace OpenSoul.Protocol;

// ── Frame types ─────────────────────────────────────────────────────────

/// <summary>
/// Discriminated gateway frame — the top-level JSON envelope on the WebSocket.
/// Frames are distinguished by the "type" field: "req", "res", or "event".
/// </summary>
[JsonDerivedType(typeof(RequestFrame), "req")]
[JsonDerivedType(typeof(ResponseFrame), "res")]
[JsonDerivedType(typeof(EventFrame), "event")]
public abstract record GatewayFrame
{
    [JsonPropertyName("type")]
    public abstract string Type { get; }
}

/// <summary>Request frame: { type:"req", id, method, params }</summary>
public sealed record RequestFrame : GatewayFrame
{
    public override string Type => "req";

    [JsonPropertyName("id")]
    public required string Id { get; init; }

    [JsonPropertyName("method")]
    public required string Method { get; init; }

    [JsonPropertyName("params")]
    public JsonElement? Params { get; init; }
}

/// <summary>Response frame: { type:"res", id, ok, payload, error }</summary>
public sealed record ResponseFrame : GatewayFrame
{
    public override string Type => "res";

    [JsonPropertyName("id")]
    public required string Id { get; init; }

    [JsonPropertyName("ok")]
    public required bool Ok { get; init; }

    [JsonPropertyName("payload")]
    public JsonElement? Payload { get; init; }

    [JsonPropertyName("error")]
    public ErrorShape? Error { get; init; }
}

/// <summary>Event frame: { type:"event", event, payload, seq }</summary>
public sealed record EventFrame : GatewayFrame
{
    public override string Type => "event";

    [JsonPropertyName("event")]
    public required string Event { get; init; }

    [JsonPropertyName("payload")]
    public JsonElement? Payload { get; init; }

    [JsonPropertyName("seq")]
    public long? Seq { get; init; }
}

// ── Error ──────────────────────────────────────────────────────────────

public sealed record ErrorShape
{
    [JsonPropertyName("code")]
    public string? Code { get; init; }

    [JsonPropertyName("message")]
    public string? Message { get; init; }
}
