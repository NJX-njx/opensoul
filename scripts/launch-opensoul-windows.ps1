# Launch OpenSoul Windows desktop from project directory.
# This ensures the Gateway finds opensoul.mjs and node_modules.
$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$installDir = "$env:LOCALAPPDATA\Programs\OpenSoul"
$exePath = Join-Path $installDir "OpenSoul.exe"

if (-not (Test-Path $exePath)) {
    Write-Error "OpenSoul.exe not found at $exePath. Install first."
    exit 1
}

$env:OPENSOUL_ENTRY = $projectRoot
Start-Process -FilePath $exePath -WorkingDirectory $projectRoot -PassThru | Out-Null
