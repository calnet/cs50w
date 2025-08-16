#!/bin/bash

# VSCode Dev Container for React Project
# Claude v0.1.0-beta

AUTOSTART=false
LOGGING=false
WORKSPACE="/workspaces/capstone"

cd $WORKSPACE
# Start Django server in background with nohup
echo "------------------------------------"
echo "Starting Django server on port 8000..."
cd $WORKSPACE/backend
nohup python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000 > /tmp/django.log 2>&1 &
DJANGO_PID=$!
echo "------------------------------------"
echo "Django PID: $DJANGO_PID (http://localhost:8000)"
echo "------------------------------------"
# Wait a moment for servers to start
sleep 5
# Check if processes are still running
if ps t | grep -E 'runserver' > /dev/null; then
    echo "✅ Django server is running"
else
    echo "❌ Django server failed to start"

    if $LOGGING; then
        echo "------------------------------------"
        echo "Django logs:"
        cat /tmp/django.log
        echo "------------------------------------"
    fi
fi

# echo "Debug commands:"
# echo "- Check processes: ps aux | grep -E '(runserver|vite)'"
# echo "- Check processes: netstat -al | grep -E '(8000|5173)'"
# echo "- Django logs: tail -f /tmp/django.log"
# echo "- Test Django: curl http://localhost:8000"
# echo "- Vite logs: tail -f /tmp/vite.log"
# echo "- Test Vite: curl http://localhost:5173"
# echo "- Manual Vite: cd frontend && npm run dev -- --host 0.0.0.0 --port 5173 > /tmp/vite.log"
# echo "- Manual Django: cd backend && python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000"

cd $WORKSPACE
