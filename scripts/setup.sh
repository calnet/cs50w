#!/bin/bash

# VSCode Dev Container for React Project
# Claude v19

# Capstone Project Setup Script
echo "🚀 Starting Capstone development environment setup..."

# Update package manager
sudo apk update

# Install required packages
sudo apk add --no-cache curl git sqlite sudo bash nodejs npm apt

# Ensure we're in the workspace directory
cd /workspaces/capstone

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
if [ -f "frontend/package.json" ]; then
    cd frontend
    echo "Installing frontend dependencies..."
    npm ci
    cd ..
    echo "✅ Node.js dependencies installed successfully"
else
    echo "⚠️  No frontend/package.json found, skipping npm install"
fi

# Install Python dependencies
echo "🐍 Installing Python dependencies..."

if [ -f "requirements.txt" ]; then
    pip install -q -r requirements.txt
    echo "✅ Python dependencies installed successfully"
elif [ -f "backend/requirements.txt" ]; then
    pip install --quiet --upgrade pip
    pip install -quiet -r backend/requirements.txt
    echo "✅ Python dependencies installed successfully"
else
    echo "⚠️  No requirements.txt found, skipping pip install"
fi

echo "🎉 Capstone development environment setup complete!"
echo "Ready for development! 🔥"

echo "Servers will start automatically when the container starts."

echo "Manual commands:"
echo "1. Django server: cd backend && python manage.py runserver 0.0.0.0:8000"
echo "2. Vite server: cd frontend && npm run dev -- --host 0.0.0.0 --port 5173"