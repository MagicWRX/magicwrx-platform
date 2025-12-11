#!/bin/bash

echo "🔍 Magic WRX Firebase Setup Verification"
echo "========================================"
echo ""

# Check Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found"
    echo "   Install: npm install -g firebase-tools"
    exit 1
else
    echo "✅ Firebase CLI installed"
fi

# Check Firebase login
if ! firebase projects:list > /dev/null 2>&1; then
    echo "❌ Not logged into Firebase"
    echo "   Run: firebase login"
    echo "   Select: MagicWRXStudio@gmail.com"
    exit 1
else
    echo "✅ Logged into Firebase"
fi

# Check current project
if [ -f ".firebaserc" ] && grep -q '"magic-wrx"' .firebaserc; then
    echo "✅ Using correct project: magic-wrx (from .firebaserc)"
else
    echo "❌ Project configuration issue"
    echo "   Run: firebase use magic-wrx"
    exit 1
fi

# Check .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found"
    echo "   Creating from template..."
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo "✅ Created .env.local"
    else
        echo "❌ .env.example not found"
        echo "   Creating basic .env.local..."
        cat > .env.local << EOF
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=magic-wrx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=magic-wrx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=magic-wrx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# Emulator Settings
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false
EOF
        echo "✅ Created basic .env.local"
    fi
else
    echo "✅ .env.local exists"
fi

# Check emulator configuration in firebase.json
if grep -q '"emulators"' firebase.json; then
    echo "✅ Emulators configured"
else
    echo "❌ Emulators not configured"
    echo "   Run: firebase init emulators"
    exit 1
fi

# Check dependencies
if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not installed"
    echo "   Run: npm install"
else
    echo "✅ Dependencies installed"
fi

echo ""
echo "🎉 Setup verification complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Start emulators: ./start-emulators.sh"
echo "   2. Start development: ./start-dev.sh"
echo "   3. Visit: http://localhost:3000"
echo ""
echo "🔧 Emulator mode:"
echo "   Set NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true in .env.local"
echo "   Then run: npm run dev:emulator"
