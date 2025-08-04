#!/bin/bash

# VSCode Dev Container for React Project
# Claude v11

# Check if processes are still running

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

# Check if Vite server is running
# check_vite_running() {
#     echo "------------------------------------------"
#     echo "  Checking Vite server on port 5173..."
#     echo "------------------------------------------"
#     netstat -tl | grep -E '(5173)' > /dev/null
# }

# Check if Vite server is running
# if check_vite_running; then
#     echo "✅ Vite server is running"
#     echo "Vite PID: $VITE_PID (http://localhost:5173)"
# else
#     echo "❌ Vite server not running"
#     if $LOGGING; then
#         echo "------------------------------------"
#         echo "Vite logs:"
#         cat /tmp/vite.log
#         echo "------------------------------------"
#     fi
# fi
# echo "------------------------------------------"
# echo "------------------------------------------"

# echo ""
# echo "Debug commands:"
# echo "- Check processes: ps aux | grep -E '(runserver|vite)'"
# echo "- Django logs: tail -f /tmp/django.log"
# echo "- Vite logs: tail -f /tmp/vite.log"
# echo "- Test Django: curl http://localhost:8000"
# echo "- Test Vite: curl http://localhost:5173"
# echo "- Manual Django: cd backend && python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000"