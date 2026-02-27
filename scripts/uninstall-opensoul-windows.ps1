# OpenSoul Windows 完全卸载脚本
# 以管理员身份运行: powershell -ExecutionPolicy Bypass -File scripts\uninstall-opensoul-windows.ps1

$ErrorActionPreference = "Continue"

Write-Host "=== OpenSoul Windows 完全卸载 ===" -ForegroundColor Cyan

# 1. 终止进程
Write-Host "`n[1/4] 终止 OpenSoul 和 Node 进程..." -ForegroundColor Yellow
Get-Process -Name "OpenSoul" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $_.MainWindowTitle -eq "" -or $_.CommandLine -like "*opensoul*"
} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "  完成" -ForegroundColor Green

# 2. 删除残留目录
Write-Host "`n[2/4] 删除残留目录..." -ForegroundColor Yellow
$dirs = @(
    "$env:LOCALAPPDATA\OpenSoul",
    "$env:APPDATA\OpenSoul",
    "C:\Program Files\OpenSoul",
    "C:\Program Files (x86)\OpenSoul"
)
foreach ($d in $dirs) {
    if (Test-Path $d) {
        try {
            Remove-Item -Path $d -Recurse -Force -ErrorAction Stop
            Write-Host "  已删除: $d" -ForegroundColor Green
        } catch {
            Write-Host "  无法删除 $d : $_" -ForegroundColor Red
        }
    }
}
Write-Host "  完成" -ForegroundColor Green

# 3. 清理注册表
Write-Host "`n[3/4] 清理注册表..." -ForegroundColor Yellow
$regPaths = @(
    "HKCU:\Software\OpenSoul",
    "HKLM:\SOFTWARE\OpenSoul",
    "HKLM:\SOFTWARE\WOW6432Node\OpenSoul"
)
foreach ($p in $regPaths) {
    if (Test-Path $p) {
        try {
            Remove-Item -Path $p -Recurse -Force -ErrorAction Stop
            Write-Host "  已删除: $p" -ForegroundColor Green
        } catch {
            Write-Host "  无法删除 $p (可能需要管理员): $_" -ForegroundColor Red
        }
    }
}
Write-Host "  完成" -ForegroundColor Green

# 4. 删除桌面快捷方式
Write-Host "`n[4/4] 删除快捷方式..." -ForegroundColor Yellow
$shortcuts = @(
    "$env:USERPROFILE\Desktop\OpenSoul.lnk",
    "$env:PUBLIC\Desktop\OpenSoul.lnk"
)
foreach ($s in $shortcuts) {
    if (Test-Path $s) {
        Remove-Item $s -Force
        Write-Host "  已删除: $s" -ForegroundColor Green
    }
}

Write-Host "`n=== 卸载完成 ===" -ForegroundColor Cyan
Write-Host "`n注意: 若通过「程序和功能」安装，请手动在 设置 → 应用 → 应用和功能 中卸载 OpenSoul" -ForegroundColor Yellow
