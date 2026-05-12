$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
$base = Join-Path $PSScriptRoot "..\public\logos"
$names = @("tiktok", "meta", "vk", "yandex")
for ($i = 0; $i -lt $names.Length; $i++) {
  $bmp = New-Object System.Drawing.Bitmap 160, 160
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::FromArgb(255, 10, 10, 18))
  $cyan = [System.Drawing.Color]::FromArgb(255, 0, 191, 255)
  $brush = New-Object System.Drawing.SolidBrush $cyan
  $pen = [System.Drawing.Pen]::new($cyan, 4)
  $g.FillEllipse($brush, 28, 28, 104, 104)
  $g.DrawEllipse($pen, 28, 28, 104, 104)
  $path = Join-Path $base ($names[$i] + ".png")
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}
Write-Host "Wrote PNG logos to $base"
