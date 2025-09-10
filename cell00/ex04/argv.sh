#!/bin/bash
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 0
fi

for i in $(seq 1 3); do
    arg=${!i} 
    if [ -n "$arg" ]; then
        echo "$arg"
    fi
done