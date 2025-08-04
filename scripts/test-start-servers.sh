#!/bin/bash

# VSCode Dev Container for React Project
# Claude v11

# Check who is running the script for start-servers.sh
whoami
# Check if Django server is running
check_django_running() {
    echo "  Checking Django server on port 8000..."
    
    echo netstat -tl | grep -E '(8000)' > /dev/null
    return $django_running
}

# Check if Vite server is running
check_vite_running() {
    echo "  Checking Vite server on port 5173..."
    echo netstat -tl | grep -E '(5173)' > /dev/null
    return $vite_running
}

# Set default values
AUTOSTART=false
LOGGING=false
WORKSPACE="/workspaces/capstone"
# DJANGO_RUNNING
# VITE_RUNNING
sleep 5

# echo "------------------------------------"
# echo DJANGO_RUNNING: $DJANGO_RUNNING
# echo VITE_RUNNING: $VITE_RUNNING
# echo django_running: $(check_django_running)
# echo vite_running: $(check_vite_running)
# echo "------------------------------------"

# Change to the workspace directory
cd $WORKSPACE

if check_django_running; then
    echo "✅ Django server is running"
    echo "Django PID: $DJANGO_PID (http://localhost:8000)"
else
    if $AUTOSTART; then
        echo "------------------------------------"
        echo "     Auto Restart Enabled"
        echo "   Django restarting....!"
        sh $WORKSPACE/scripts/start-backend.sh
        # Wait a moment for servers to start
        sleep 5
    else
    echo "------------------------------------"
    echo "     Django server starting....!"
    echo "------------------------------------"
        # echo "❌ Django was not running"
        sh $WORKSPACE/scripts/start-backend.sh
        # if $LOGGING; then
        #     echo "------------------------------------"
        #     echo "Django logs:"
        #     cat /tmp/django.log
        #     echo "------------------------------------"
        # fi
    fi
fi

# Check if Vite server is running
# if check_vite_running; then
#     echo "✅ Vite server is running"
#     echo "Vite PID: $VITE_PID (http://localhost:5173)"
# else
#     if $AUTOSTART; then
#         echo "------------------------------------"
#         echo "   Vite server restarting....!"
#         echo "------------------------------------"
#         sh $WORKSPACE/scripts/start-frontend.sh
#     else
#         echo $vite_running
#         echo "❌ Vite server was not running"
#         sh $WORKSPACE/scripts/start-frontend.sh
#         check_vite_running
#     fi
    # if $LOGGING; then
    #     echo "------------------------------------"
    #     echo "             Vite logs"
    #     echo "------------------------------------"
    #     cat /tmp/vite.log
    #     echo "------------------------------------"
    # fi
# fi

# if check_django_running && check_vite_running; then
#     echo "------------------------------------------"
#     echo "Both servers are running successfully!"
# else
#     echo "------------------------------------------"
#     echo "One or both servers failed to start."
# fi

# echo "------------------------------------------"

# if ($django_running && check_django_running) && ($vite_running && check_vite_running); then
#     echo "Django was running:" $django_running
#     check_django_running
#     echo "Vite was running:" $vite_running
#     check_vite_running
#     echo "------------------------------------------"
#     echo "  All servers are running as expected!"
#     echo "------------------------------------------"
# else
#     sh $WORKSPACE/scripts/stop-servers.sh
# fi

# echo ""
# echo "Debug commands:"
# echo "- Check processes: ps aux | grep -E '(runserver|vite)'"
# echo "- Django logs: tail -f /tmp/django.log"
# echo "- Vite logs: tail -f /tmp/vite.log"
# echo "- Test Django: curl http://localhost:8000"
# echo "- Test Vite: curl http://localhost:5173"
# echo "- Manual Django: cd backend && python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000"
# echo "- Stop all servers: pkill -f 'runserver|vite'"

# Keep script running
# wait