#!/bin/bash

# Haunted Refactorium Setup Script
# Automates the initial setup process

set -e

echo "🎃 Haunted Refactorium Setup"
echo "=============================="
echo ""

# Check Node.js version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18 or higher is required (you have $(node -v))"
    exit 1
fi
echo "✓ Node.js $(node -v)"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install
echo "✓ Dependencies installed"
echo ""

# Create .env file
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created"
else
    echo "✓ .env file already exists"
fi
echo ""

# Create uploads directory
mkdir -p uploads
echo "✓ Uploads directory created"
echo ""

# Run verification
echo "Running setup verification..."
node scripts/verify-setup.js
echo ""

echo "=============================="
echo "🎉 Setup complete!"
echo ""
echo "To start development:"
echo "  Terminal 1: npm run dev:backend"
echo "  Terminal 2: npm run dev:frontend"
echo ""
echo "For Docker deployment:"
echo "  docker-compose up"
echo ""
echo "Happy haunting! 👻"
