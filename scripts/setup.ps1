# Haunted Refactorium Setup Script (PowerShell)
# Automates the initial setup process for Windows

Write-Host "🎃 Haunted Refactorium Setup" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js version
Write-Host "Checking Node.js version..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    $majorVersion = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
    if ($majorVersion -lt 18) {
        Write-Host "❌ Node.js 18 or higher is required (you have $nodeVersion)" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "✓ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Create .env file
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✓ .env file created" -ForegroundColor Green
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}
Write-Host ""

# Create uploads directory
if (-not (Test-Path uploads)) {
    New-Item -ItemType Directory -Path uploads | Out-Null
    Write-Host "✓ Uploads directory created" -ForegroundColor Green
} else {
    Write-Host "✓ Uploads directory exists" -ForegroundColor Green
}
Write-Host ""

# Run verification
Write-Host "Running setup verification..." -ForegroundColor Yellow
node scripts/verify-setup.js
Write-Host ""

Write-Host "==============================" -ForegroundColor Cyan
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start development:" -ForegroundColor Cyan
Write-Host "  Terminal 1: npm run dev:backend"
Write-Host "  Terminal 2: npm run dev:frontend"
Write-Host ""
Write-Host "For Docker deployment:" -ForegroundColor Cyan
Write-Host "  docker-compose up"
Write-Host ""
Write-Host "Happy haunting! 👻" -ForegroundColor Magenta
