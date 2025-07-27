#!/bin/bash

# VSCode Dev Container for React Project
# Claude v11

cd /workspaces/capstone

# Start Django server in background with nohup
echo "Starting Django server on port 8000..."
cd backend
nohup python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000 > /tmp/django.log 2>&1 &
DJANGO_PID=$!

# Start Vite server in background with nohup
echo "Starting Vite server on port 5173..."
cd ../frontend
nohup npm run dev -- --host 0.0.0.0 --port 5173 > /tmp/vite.log 2>&1 &
VITE_PID=$!

echo "Servers started in background!"
echo "Django PID: $DJANGO_PID (http://localhost:8000)"
echo "Vite PID: $VITE_PID (http://localhost:5173)"

# Wait a moment for servers to start
sleep 5

# Check if processes are still running
if ps -p $DJANGO_PID > /dev/null; then
    echo "✅ Django server is running"
else
    echo "❌ Django server failed to start"
    cat ../django.log
fi

if ps -p $VITE_PID > /dev/null; then
    echo "✅ Vite server is running"
else
    echo "❌ Vite server failed to start"
    cat ../vite.log
fi

echo ""
echo "Debug commands:"
echo "- Check processes: ps aux | grep -E '(runserver|vite)'"
echo "- Django logs: tail -f /tmp/django.log"
echo "- Vite logs: tail -f /tmp/vite.log"
echo "- Test Django: curl http://localhost:8000"
echo "- Test Vite: curl http://localhost:5173"
echo "- Manual Django: cd backend && python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000"

# Keep script running
wait