# Voter Awareness Platform - Setup Script
# Run this script to set up the entire project

Write-Host "🗳️  Voter Awareness Platform Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js $nodeVersion installed" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ from nodejs.org" -ForegroundColor Red
    exit 1
}

# Check MongoDB
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
$mongoCheck = mongod --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ MongoDB installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB not found locally. You can use MongoDB Atlas instead." -ForegroundColor Yellow
    Write-Host "   Visit: https://www.mongodb.com/cloud/atlas" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host ""

# Install client dependencies
Write-Host "📦 Installing client dependencies..." -ForegroundColor Cyan
Set-Location client
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Client dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install client dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Install server dependencies
Write-Host "📦 Installing server dependencies..." -ForegroundColor Cyan
Set-Location server
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Server dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install server dependencies" -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "📝 Creating .env file..." -ForegroundColor Cyan
    Copy-Item .env.example .env
    Write-Host "✅ .env file created. Please update it with your MongoDB URI." -ForegroundColor Green
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update server/.env with your MongoDB connection string" -ForegroundColor White
Write-Host "2. Start MongoDB (if running locally): mongod" -ForegroundColor White
Write-Host "3. Seed the database: cd server && npm run seed" -ForegroundColor White
Write-Host "4. Start the backend: cd server && npm run dev" -ForegroundColor White
Write-Host "5. Start the frontend (in new terminal): cd client && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Visit: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
