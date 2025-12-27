#!/bin/bash

# MagicWRX Local Development Server Launcher
# Ensures the app runs on localhost:3002

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 MagicWRX Development Manager${NC}"
echo "==============================="

# Check environment
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ Error: .env.local file not found!${NC}"
    exit 1
fi

# Port Management
PORT=3002
PID=$(lsof -ti:$PORT)
if [ -n "$PID" ]; then
    echo -e "${YELLOW}⚠️  Port $PORT is currently in use by PID $PID.${NC}"
    read -p "Do you want to kill it and start the server? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill -9 $PID
        echo -e "${GREEN}✅ Port $PORT freed.${NC}"
    else
        echo -e "${RED}❌ Cannot start server on port $PORT. Exiting.${NC}"
        exit 1
    fi
fi

# Start Server
echo -e "${GREEN}🔧 Starting Next.js on port $PORT...${NC}"
echo -e "${GREEN}🌐 http://localhost:$PORT${NC}"

exec npm run dev -- -p $PORT
