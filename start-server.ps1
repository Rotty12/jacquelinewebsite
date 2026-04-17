param(
  [int]$Port = 8000
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

while (Test-NetConnection -ComputerName 127.0.0.1 -Port $Port -InformationLevel Quiet) {
  $Port++
}

$url = "http://127.0.0.1:$Port/index.html"
Start-Process $url | Out-Null

Write-Host "Serving on $url"
Write-Host "Press Ctrl+C to stop."

if (Get-Command node -ErrorAction SilentlyContinue) {
  node "$root\server.js" $Port
  exit $LASTEXITCODE
}

if (Get-Command python -ErrorAction SilentlyContinue) {
  python -m http.server $Port --bind 127.0.0.1
  exit $LASTEXITCODE
}

Write-Host "Node.js and Python are both unavailable. Install Node.js or Python to run the local server."
exit 1

