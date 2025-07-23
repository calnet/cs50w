#!/bin/bash
set -e

# Setup script for development environment
echo "🚀 Starting development environment setup..."

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
if [ -f "frontend/package.json" ]; then
    cd frontend && rm -rf node_modules && npm ci && cd ..
    echo "✅ Node.js dependencies installed successfully"
else
    echo "⚠️  No frontend/package.json found, skipping npm install"
fi

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    echo "✅ Python dependencies installed successfully"
else
    echo "⚠️  No requirements.txt found, skipping pip install"
fi

echo "🎉 Development environment setup complete!"
echo "Ready for development! 🔥"
