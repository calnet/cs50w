#!/bin/bash

# VSCode Dev Container for React Project
# Claude v11

netstat -tl | grep -E '(8000|5173)'
ps a  | grep -E '(runserver|vite)'