# Build a self-contained Windows release with node_modules for the Gateway.
# Run from project root: .\scripts\build-windows-release.ps1

$ErrorActionPreference = "Stop"
$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$version = (Get-Content (Join-Path $projectRoot "package.json") | ConvertFrom-Json).version
$zipDirName = "OpenSoul-Windows-x64-v$version"
$stagingDir = Join-Path $projectRoot $zipDirName
# Remove previous build (may have symlinks - try both methods)
if (Test-Path $stagingDir) {
    Remove-Item $stagingDir -Recurse -Force -ErrorAction SilentlyContinue
    if (Test-Path $stagingDir) { cmd /c "rd /s /q `"$stagingDir`"" 2>$null }
}
$win64Source = Join-Path $projectRoot "apps\windows\src\OpenSoul\bin\Release\net8.0-windows10.0.19041.0\win-x64"
$zipName = "OpenSoul-Windows-x64-v$version.zip"

Write-Host "[build] version: $version"
Write-Host "[build] staging: $stagingDir"

# Clean staging
if (Test-Path $stagingDir) { Remove-Item $stagingDir -Recurse -Force }
New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null

# 1. Copy win-x64 (exe, dlls, control-ui)
Write-Host "[build] copying win-x64..."
robocopy $win64Source $stagingDir /E /NFL /NDL /NJH /NJS /NP /R:2 /W:2 | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed" }

# 2. Copy Node runtime files (opensoul.mjs, dist, package.json, pnpm-workspace, extensions, skills, assets)
Write-Host "[build] copying Node runtime..."
$nodeFiles = @(
    "opensoul.mjs",
    "dist",
    "package.json",
    "pnpm-lock.yaml",
    "pnpm-workspace.yaml",
    "extensions",
    "packages",
    "skills",
    "assets"
)
foreach ($item in $nodeFiles) {
    $src = Join-Path $projectRoot $item
    if (Test-Path $src) {
        $dst = Join-Path $stagingDir $item
        if (Test-Path $dst) { Remove-Item $dst -Recurse -Force -ErrorAction SilentlyContinue }
        if (Test-Path $src -PathType Container) {
            New-Item -ItemType Directory -Path $dst -Force | Out-Null
            # Exclude node_modules (pnpm symlinks cause copy errors); pnpm install will recreate
            robocopy $src $dst /E /XD node_modules /NFL /NDL /NJH /NJS /NP /R:2 /W:2 2>&1 | Out-Null
            if ($LASTEXITCODE -ge 8) { throw "robocopy $item failed" }
        } else {
            Copy-Item $src $dst -Force
        }
    }
}

# 2b. Override pnpm-workspace to exclude ui (control-ui is in win-x64; ui has symlinks that break zip)
@"
packages:
  - .
  - packages/*
  - extensions/*

onlyBuiltDependencies:
  - "@lydell/node-pty"
  - "@matrix-org/matrix-sdk-crypto-nodejs"
  - "@napi-rs/canvas"
  - "@whiskeysockets/baileys"
  - authenticate-pam
  - esbuild
  - node-llama-cpp
  - protobufjs
  - sharp
"@ | Set-Content (Join-Path $stagingDir "pnpm-workspace.yaml") -Encoding UTF8

# 3. Install node_modules in staging (extensions had node_modules excluded due to pnpm symlinks)
Write-Host "[build] installing node_modules..."
$env:CI = "true"
Push-Location $stagingDir
try {
    pnpm install --prod --ignore-scripts 2>&1 | Out-Host
    if ($LASTEXITCODE -ne 0) { throw "pnpm install failed" }
} finally {
    Pop-Location
}

# 5. Create zip (staging is already OpenSoul-Windows-x64-v{version} in project root)
$zipPath = Join-Path $projectRoot $zipName
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Write-Host "[build] creating $zipName..."
Push-Location $projectRoot
try {
    $tarOut = tar -a -cf $zipPath $zipDirName 2>&1
    if ($LASTEXITCODE -ne 0 -or $tarOut -match "Cannot stat") { throw "tar failed" }
} catch {
    Write-Host "[build] tar had issues, using Compress-Archive..."
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
    Compress-Archive -Path $stagingDir -DestinationPath $zipPath -CompressionLevel Optimal -Force
}
Pop-Location

# Cleanup
Remove-Item $stagingDir -Recurse -Force -ErrorAction SilentlyContinue

$sizeMB = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Host "[build] done: $zipPath ($sizeMB MB)"
