#!/bin/bash

# VSCode Dev Container for React Project
# Claude v0.1.0-beta

# Check if processes are still running

AUTORELOAD=true
DEBUG=true
LOGGING=false
WORKSPACE="/workspaces/capstone"

# Check if Django server is running
check_django_running() {
    echo "------------------------------------------"
    echo "  Checking Django server on port 8000..."
    echo "------------------------------------------"
    netstat -tl | grep -E '(8000)' > /dev/null
}

if check_django_running; then
    echo "✅ Django server is running"
else
    if AUTORELOAD; then
        echo "⚠️  Django server not running, attempting to restart..."
        sh $WORKSPACE/scripts/start-backend.sh
        sleep 5
        if check_django_running; then
            echo "✅ Django server restarted successfully"
        else
            echo "❌ Failed to restart Django server"
        fi
    else
        echo "❌ Django server not running"
    fi
    echo "❌ Django server not running"
    if $LOGGING; then
        echo "---------------------------------------"
        echo "          Django logs"
        echo "---------------------------------------"
        tail -n 5 /tmp/django.log
        echo "---------------------------------------"
    fi
fi
echo "------------------------------------------"

# Check if Django server is running
check_vite_running() {
    echo "------------------------------------------"
    echo "  Checking Vite server on port 5173..."
    echo "------------------------------------------"
    netstat -tl | grep -E '(5173)' > /dev/null
}

if check_vite_running; then
    echo "✅ Vite server is running"
else
    if AUTORELOAD; then
        echo "⚠️  Vite server not running, attempting to restart..."
        sh $WORKSPACE/scripts/start-frontend.sh
        sleep 5
        if check_vite_running; then
            echo "✅ Vite server restarted successfully"
        else
            echo "❌ Failed to restart Vite server"
        fi
    else
        echo "❌ Vite server not running"
    fi
    echo "❌ Vite server not running"
    if $LOGGING; then
        echo "---------------------------------------"
        echo "          Vite logs"
        echo "---------------------------------------"
        tail -n 10 /tmp/vite.log
        echo "---------------------------------------"
    fi
fi
echo "------------------------------------------"
if DEBUG; then
    echo ""
    echo "---------------------------------------"
    echo "          Debug commands"
    echo "---------------------------------------"
    echo "- Check processes: ps aux | grep -E '(runserver|vite)'"
    echo "- Django logs: tail -f /tmp/django.log"
    echo "- Vite logs: tail -f /tmp/vite.log"
    echo "- Test Django: curl http://localhost:8000"
    echo "- Test Vite: curl http://localhost:5173"
    echo "- Manual Django: cd backend && python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000"
    echo "---------------------------------------"
fi
