#!/bin/bash

# VSCode Dev Container for React Project
# Claude v11

# Capstone Project Start Servers Script
WORKSPACE="/workspaces/capstone"
cd $WORKSPACE
# Start Django server in background with nohup
sh $WORKSPACE/scripts/start-backend.sh
# Start Vite server in background with nohup
sh $WORKSPACE/scripts/start-frontend.sh

# Keep script running
wait