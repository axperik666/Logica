# Синхронизация с https://github.com/axperik666/Logica
# Требуется Git: https://git-scm.com/download/win
# Для push по HTTPS GitHub может запросить Personal Access Token вместо пароля.

param(
  [string]$Message = "LOGICA Marketing: обновление проекта"
)

$ErrorActionPreference = "Stop"
$Root = if ($PSScriptRoot) { $PSScriptRoot } else { Get-Location }
Set-Location -LiteralPath $Root

$origin = "https://github.com/axperik666/Logica.git"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Git не найден. Установите: https://git-scm.com/download/win" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path -LiteralPath ".git")) {
  git init -b main
}

if (git remote get-url origin 2>$null) {
  git remote set-url origin $origin
} else {
  git remote add origin $origin
}

git add -A
if (git status --porcelain) {
  git commit -m $Message
} else {
  Write-Host "Коммит не нужен — нет изменений после git add."
}

git branch -M main 2>$null

Write-Host "Проверка удалённой ветки main..." -ForegroundColor Cyan
$hasRemoteMain = git ls-remote --heads origin main 2>$null
if ($hasRemoteMain) {
  Write-Host "На origin уже есть main — подтягиваем историю..." -ForegroundColor Cyan
  git pull origin main --rebase --allow-unrelated-histories
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Разрешите конфликты вручную (git status), затем снова запустите скрипт или выполните git push." -ForegroundColor Yellow
    exit 1
  }
}

Write-Host "Отправка: git push -u origin main" -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "Если отказ в доступе: создайте репозиторий Logica на GitHub (или проверьте имя/видимость)." -ForegroundColor Yellow
  Write-Host "Токен: GitHub → Settings → Developer settings → Personal access tokens." -ForegroundColor Yellow
  exit $LASTEXITCODE
}

Write-Host "Готово." -ForegroundColor Green
