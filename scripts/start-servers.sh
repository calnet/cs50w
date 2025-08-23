#!/bin/bash

# VSCode Dev Container for React Project
# Claude v0.1.0-beta

# Capstone Project Start Servers Script
WORKSPACE="/workspaces/capstone"
cd $WORKSPACE
# Start Vite server in background with nohup
sh $WORKSPACE/scripts/start-frontend.sh
# sleep 5
# Start Django server in background with nohup
sh $WORKSPACE/scripts/start-backend.sh
# Test servers
sleep 5
sh $WORKSPACE/scripts/test-servers.sh
