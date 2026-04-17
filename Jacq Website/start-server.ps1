param(
  [int]$Port = 8000
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  Write-Host "Python not found. Install Python or run a different local web server."
  exit 1
}

while (Test-NetConnection -ComputerName 127.0.0.1 -Port $Port -InformationLevel Quiet) {
  $Port++
}

$url = "http://127.0.0.1:$Port/index.html"
Start-Process $url | Out-Null

Write-Host "Serving on $url"
Write-Host "Press Ctrl+C to stop."
python -m http.server $Port --bind 127.0.0.1

