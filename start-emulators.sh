#!/bin/bash

echo "🔧 Magic WRX Firebase Emulator Setup"
echo "===================================="
echo ""

# Check if Firebase CLI is logged in
if ! firebase projects:list > /dev/null 2>&1; then
    echo "❌ Not logged into Firebase. Please run:"
    echo "   firebase login"
    echo "   Make sure to select MagicWRXStudio@gmail.com"
    exit 1
fi

# Check if we're using the correct project
if [ -f ".firebaserc" ] && grep -q '"magic-wrx"' .firebaserc; then
    echo "✅ Connected to Firebase project: magic-wrx"
else
    echo "❌ Project configuration issue"
    echo "   Run: firebase use magic-wrx"
    firebase use magic-wrx
fi

echo "✅ Connected to Firebase project: magic-wrx"
echo "✅ Account: MagicWRXStudio@gmail.com"
echo ""

echo "🚀 Starting Firebase Emulators..."
echo "   Auth Emulator:      http://localhost:9099"
echo "   Firestore Emulator: http://localhost:8080"
echo "   Storage Emulator:   http://localhost:9199"
echo "   Hosting Emulator:   http://localhost:5000"
echo "   Emulator UI:        http://localhost:4000"
echo ""

echo "💡 To use emulators with your Next.js app:"
echo "   1. Set NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true in .env.local"
echo "   2. Run: npm run dev:emulator"
echo ""

# Start emulators
firebase emulators:start
