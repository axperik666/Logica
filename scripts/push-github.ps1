# Одноразовый push на GitHub (Personal Access Token с правом repo)
# В PowerShell:
#   $env:GITHUB_TOKEN = "ghp_xxxxxxxx"   # токен из GitHub → Settings → Developer settings
#   .\scripts\push-github.ps1

param()
$ErrorActionPreference = "Stop"
$root = Split-Path -LiteralPath (Split-Path -LiteralPath $PSScriptRoot -Parent)
Set-Location $root

if (-not $env:GITHUB_TOKEN) {
  Write-Host "Задайте переменную окружения GITHUB_TOKEN (classic PAT с scope repo)." -ForegroundColor Yellow
  Write-Host 'Пример: $env:GITHUB_TOKEN = "ghp_..."' -ForegroundColor DarkGray
  exit 1
}

$git = Join-Path $root ".tools\MinGit\cmd\git.exe"
if (-not (Test-Path $git)) {
  $git = "git"
}

$url = "https://$($env:GITHUB_TOKEN)@github.com/axperik666/Logica.git"
& $git push $url main
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Готово: ветка main отправлена на GitHub." -ForegroundColor Green
