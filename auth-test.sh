#!/bin/bash

# MagicWRX Authentication Test Script
# Tests Google login and other authentication features

echo "🧪 MagicWRX Authentication Test"
echo "==============================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if development server is running
echo "🔍 Checking development server..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    print_success "Development server is running on localhost:3000"
else
    print_warning "Development server is not running"
    echo "Start it with: npm run dev"
    echo ""
    read -p "Do you want to start the development server? (y/n): " start_dev
    
    if [[ $start_dev == "y" || $start_dev == "Y" ]]; then
        echo "Starting development server..."
        npm run dev &
        DEV_PID=$!
        
        # Wait for server to start (up to 30 seconds)
        for i in {1..30}; do
            if curl -s http://localhost:3000 > /dev/null 2>&1; then
                print_success "Development server started successfully"
                break
            fi
            sleep 1
        done
        
        if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
            print_error "Failed to start development server"
            kill $DEV_PID 2>/dev/null || true
            exit 1
        fi
    else
        echo "Please start the development server manually and run this script again"
        exit 1
    fi
fi

# Test authentication pages
echo ""
echo "🌐 Testing authentication pages..."
echo ""

# Test login page
if curl -s http://localhost:3000/login | grep -q "Sign in to your account"; then
    print_success "Login page is accessible"
else
    print_error "Login page is not accessible"
fi

# Test signup page
if curl -s http://localhost:3000/signup | grep -q "Create your account"; then
    print_success "Signup page is accessible"
else
    print_error "Signup page is not accessible"
fi

# Test demo login page
if curl -s http://localhost:3000/demo-login | grep -q "Demo"; then
    print_success "Demo login page is accessible"
else
    print_warning "Demo login page is not accessible"
fi

# Check Firebase configuration
echo ""
echo "🔥 Testing Firebase configuration..."
echo ""

# Check if Firebase config is valid
if grep -q "magic-wrx" src/lib/firebase.ts; then
    print_success "Firebase project ID is configured"
else
    print_error "Firebase project ID is not configured"
fi

# Check if Google Auth provider is imported
if grep -q "GoogleAuthProvider" src/app/login/page.tsx; then
    print_success "Google Auth provider is imported"
else
    print_error "Google Auth provider is not imported"
fi

# Check if Google login function exists
if grep -q "handleGoogleLogin" src/app/login/page.tsx; then
    print_success "Google login function exists"
else
    print_error "Google login function is missing"
fi

# Check if Google signup function exists
if grep -q "handleGoogleSignup" src/app/signup/page.tsx; then
    print_success "Google signup function exists"
else
    print_error "Google signup function is missing"
fi

echo ""
echo "📋 Authentication Test Summary"
echo "============================="
echo ""
print_info "Manual testing required:"
echo ""
echo "1. Open browser and go to: http://localhost:3000/login"
echo "2. Test email/password login"
echo "3. Test Google login (requires Firebase Auth setup)"
echo "4. Test signup page: http://localhost:3000/signup"
echo "5. Test demo mode: http://localhost:3000/demo-login"
echo ""
echo "🔧 Firebase Console Setup:"
echo "   https://console.firebase.google.com/project/magic-wrx/authentication"
echo ""
echo "📚 Troubleshooting:"
echo "   - /setup-guide - Setup instructions"
echo "   - /troubleshooting - Common issues"
echo ""

print_success "Authentication test completed!"
echo ""
echo "🌐 Your authentication is ready for testing!" 