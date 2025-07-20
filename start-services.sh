#!/bin/bash

# Start services script
echo "🚀 Starting development services..."

# Start Django backend
echo "🐍 Starting Django backend on port 8000..."
cd backend && python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000 &
DJANGO_PID=$!

# Start Vite frontend
echo "⚡ Starting Vite frontend on port 5173..."
cd frontend && npm run dev -- --host 0.0.0.0 &
VITE_PID=$!

# Go back to app root
cd ../

echo "✅ Services started!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:8000"
echo "📋 Django PID: $DJANGO_PID"
echo "📋 Vite PID:   $VITE_PID"

# Keep script running and handle cleanup
trap "echo 'Stopping services...'; kill $DJANGO_PID $VITE_PID 2>/dev/null; exit" SIGINT SIGTERM

# Wait for background processes
wait