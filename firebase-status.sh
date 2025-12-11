#!/bin/bash

# Check Firebase CLI login status, current project, and available projects

echo "\n=== Firebase CLI Account(s) ==="
firebase login:list

echo "\n=== Current Firebase Project (in this directory) ==="
firebase use

echo "\n=== All Available Firebase Projects ==="
firebase projects:list 