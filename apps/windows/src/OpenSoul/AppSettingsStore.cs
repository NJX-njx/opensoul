using System.IO;
using System.Text.Json;
using OpenSoul.Gateway;

namespace OpenSoul;

public sealed class AppSettingsStore
{
    private static readonly JsonSerializerOptions Json = new()
    {
        PropertyNameCaseInsensitive = true,
        WriteIndented = true,
    };

    public async Task<AppSettings> LoadAsync(CancellationToken ct = default)
    {
        var path = OpenSoulPaths.SettingsPath;
        if (!File.Exists(path))
            return new AppSettings();

        try
        {
            var text = await File.ReadAllTextAsync(path, ct);
            return JsonSerializer.Deserialize<AppSettings>(text, Json) ?? new AppSettings();
        }
        catch
        {
            return new AppSettings();
        }
    }

    public async Task SaveAsync(AppSettings settings, CancellationToken ct = default)
    {
        OpenSoulPaths.EnsureDirectories();
        var path = OpenSoulPaths.SettingsPath;
        var json = JsonSerializer.Serialize(settings, Json);
        await File.WriteAllTextAsync(path, json, ct);
    }
}
