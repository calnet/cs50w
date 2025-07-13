#!/bin/bash
set -e

# Function to handle shutdown gracefully
cleanup() {
    echo "Shutting down services..."
    kill -TERM $NPM_PID $DJANGO_PID 2>/dev/null
    wait $NPM_PID $DJANGO_PID 2>/dev/null
    echo "Services stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

# Wait for services to be ready
wait_for_service() {
    local url=$1
    local service=$2
    echo "Waiting for $service to be ready..."
    
    for i in {1..30}; do
        if curl -f "$url" >/dev/null 2>&1; then
            echo "$service is ready!"
            return 0
        fi
        echo "Waiting for $service... ($i/30)"
        sleep 10
    done
    echo "Warning: $service may not be ready"
}

# Start npm dev server in the background
echo "Starting npm dev server..."
cd /app/frontend
npm run dev &
NPM_PID=$!

# Start Django server in the background
echo "Starting Django server..."
cd /app/backend
python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000 &
DJANGO_PID=$!

# Wait for services to be ready
wait_for_service "http://localhost:8000/admin/login/?next=/admin/" "Django"

echo "All services started successfully!"
echo "Django PID: $DJANGO_PID"
echo "NPM PID: $NPM_PID"

# Wait for processes to exit
wait $NPM_PID $DJANGO_PID