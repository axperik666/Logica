# 12 абстрактных плиток-подписей для hero (замените на официальные PNG при необходимости).
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
$base = Join-Path $PSScriptRoot "..\public\logos"
if (-not (Test-Path $base)) { New-Item -ItemType Directory -Path $base | Out-Null }

$defs = @(
  @{ name = "tiktok";      rgb = @(0, 230, 255) },
  @{ name = "meta";        rgb = @(100, 200, 255) },
  @{ name = "vk";          rgb = @(0, 140, 255) },
  @{ name = "yandex";      rgb = @(255, 200, 0) },
  @{ name = "instagram";   rgb = @(255, 80, 180) },
  @{ name = "youtube";     rgb = @(255, 60, 60) },
  @{ name = "telegram";    rgb = @(40, 170, 255) },
  @{ name = "googleads";   rgb = @(60, 180, 100) },
  @{ name = "linkedin";    rgb = @(30, 130, 220) },
  @{ name = "x";           rgb = @(220, 230, 240) },
  @{ name = "pinterest";   rgb = @(230, 40, 60) },
  @{ name = "snapchat";    rgb = @(255, 240, 80) }
)

$bg = [System.Drawing.Color]::FromArgb(255, 10, 10, 18)
$W = 128
$H = 128

foreach ($d in $defs) {
  $bmp = New-Object System.Drawing.Bitmap $W, $H
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear($bg)

  $accent = [System.Drawing.Color]::FromArgb(255, $d.rgb[0], $d.rgb[1], $d.rgb[2])
  $brush = New-Object System.Drawing.SolidBrush $accent
  $pen = [System.Drawing.Pen]::new($accent, 3)

  $h = 0
  for ($j = 0; $j -lt $d.name.Length; $j++) { $h = ($h * 31 + [int][char]$d.name[$j]) -band 0x7fff }
  $shape = $h % 3

  switch ($shape) {
    0 {
      $g.FillEllipse($brush, 14, 14, 100, 100)
      $g.DrawEllipse($pen, 14, 14, 100, 100)
    }
    1 {
      $pts = @(
        [System.Drawing.Point]::new(64, 12),
        [System.Drawing.Point]::new(112, 52),
        [System.Drawing.Point]::new(96, 116),
        [System.Drawing.Point]::new(32, 116),
        [System.Drawing.Point]::new(16, 52)
      )
      $g.FillPolygon($brush, $pts)
      $g.DrawPolygon($pen, $pts)
    }
    default {
      $g.FillEllipse($brush, 24, 24, 80, 80)
      $g.DrawEllipse($pen, 18, 18, 92, 92)
    }
  }

  $font = [System.Drawing.Font]::new("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
  $sf = [System.Drawing.StringFormat]::new()
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Far
  $tb = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230, 235, 245))
  $label = $d.name.Substring(0, [Math]::Min(5, $d.name.Length)).ToUpperInvariant()
  $g.DrawString($label, $font, $tb, [System.Drawing.RectangleF]::new(0, 86, $W, 40), $sf)

  $out = Join-Path $base ($d.name + ".png")
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

Write-Host "Wrote $($defs.Count) PNG logos to $base"
