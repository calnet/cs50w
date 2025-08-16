#!/bin/bash

# VSCode Dev Container for React Project
# Claude v0.1.0-beta

# Capstone Project Start Servers Script
WORKSPACE="/workspaces/capstone"
cd $WORKSPACE
# Stop any running servers
sh $WORKSPACE/scripts/stop-servers.sh
# Start Vite server in background with nohup
sh $WORKSPACE/scripts/start-frontend.sh
# Start Django server in background with nohup
sh $WORKSPACE/scripts/start-backend.sh
sleep 10
# Test servers
sh $WORKSPACE/scripts/test-servers.sh
