#!/bin/bash

echo "🚀 Starting Magic WRX Development Server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from template..."
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo "✅ Created .env.local - you can customize it if needed"
    else
        echo "⚠️  .env.example not found, creating basic .env.local..."
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
        echo "✅ Created basic .env.local - update with your Firebase config"
    fi
fi

# Check Firebase configuration
if grep -q "NEXT_PUBLIC_FIREBASE_PROJECT_ID=magic-wrx" .env.local; then
    echo "✅ Firebase configured for magic-wrx project"
else
    echo "⚠️  Warning: Firebase configuration may need attention"
    echo "   Check .env.local file and ensure it's configured for magic-wrx project"
fi

# Check emulator setting
if grep -q "NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true" .env.local; then
    echo "🔧 Emulator mode enabled - make sure emulators are running:"
    echo "   Run: ./start-emulators.sh (in another terminal)"
    echo ""
else
    echo "🌐 Production mode - using live Firebase services"
    echo "   To use emulators, set NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true in .env.local"
    echo ""
fi

# Start the development server
echo "🌐 Starting Next.js development server on http://localhost:3000"
echo "📋 Available pages:"
echo "   • Home: http://localhost:3000"
echo "   • Login: http://localhost:3000/login"
echo "   • Demo Login: http://localhost:3000/demo-login"
echo "   • Templates: http://localhost:3000/templates"
echo ""

npm run dev
