#!/bin/bash

# VSCode Dev Container for React Project
# Claude v11

# Capstone Project Start Servers Script
WORKSPACE="/workspaces/capstone"
cd $WORKSPACE
# Stop any running servers
sh $WORKSPACE/scripts/stop-servers.sh
# Start Django server in background with nohup
sh $WORKSPACE/scripts/start-backend.sh
# Start Vite server in background with nohup
sh $WORKSPACE/scripts/start-frontend.sh
sleep 10
# Test servers
sh $WORKSPACE/scripts/test-servers.sh

# Keep script running
wait