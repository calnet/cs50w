#!/bin/bash

# VSCode Dev Container for React Project
# Claude v0.1.0-beta

netstat -tl | grep -E '(8000|5173|3000)'
ps au  | grep -E '(runserver|vite|0.0.0.0)'