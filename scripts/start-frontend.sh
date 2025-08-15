#!/bin/bash

# VSCode Dev Container for React Project
# Claude v11

AUTOSTART=false
LOGGING=false
WORKSPACE="/workspaces/capstone"

cd $WORKSPACE
# Start Vite server in background with nohup
echo "------------------------------------"
echo "Starting Vite server on port 5173..."
cd $WORKSPACE/frontend
nohup npm run dev -- --host 0.0.0.0 --port 5173 > /tmp/vite.log 2>&1 &
VITE_PID=$!
echo "------------------------------------"
echo "Vite PID: $VITE_PID (http://localhost:5173)"
echo "------------------------------------"
# Wait a moment for servers to start
sleep 5
# Check if processes are still running
if ps -p $VITE_PID > /dev/null; then
    echo "✅ Vite server is running"
else
    echo "❌ Vite server failed to start"

    if $LOGGING; then
        echo "------------------------------------"
        echo "Vite logs:"
        cat /tmp/vite.log
        echo "------------------------------------"
    fi
fi

# echo "Debug commands:"
# echo "- Check processes: ps aux | grep -E '(runserver|vite)'"
# echo "- Vite logs: tail -f /tmp/vite.log"
# echo "- Test Vite: curl http://localhost:5173"
# echo "- Django logs: tail -f /tmp/django.log"
# echo "- Test Django: curl http://localhost:8000"
# echo "- Manual Django: cd backend && python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000"

cd $WORKSPACE
# Keep script running
wait