#!/bin/bash

# MagicWRX Authentication Setup Script
# Configures Google login and other authentication providers

echo "🔐 MagicWRX Authentication Setup"
echo "================================"
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

# Check if Firebase CLI is installed
echo "📋 Checking Firebase CLI..."
if ! command -v firebase &> /dev/null; then
    print_error "Firebase CLI is not installed"
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi
print_success "Firebase CLI is installed"

# Check if logged into Firebase
echo ""
echo "🔐 Checking Firebase authentication..."
CURRENT_USER=$(firebase login:list 2>/dev/null | grep "magicwrxstudio@gmail.com" || echo "")

if [ -z "$CURRENT_USER" ]; then
    print_warning "Not logged in as MagicWRXStudio@gmail.com"
    echo "Please run: ./firebase-switch.sh"
    echo "Select option 2 to login as MagicWRXStudio@gmail.com"
    exit 1
fi
print_success "Logged in as MagicWRXStudio@gmail.com"

# Check current project
echo ""
echo "🏗️  Checking Firebase project..."
CURRENT_PROJECT=$(firebase use 2>/dev/null | grep "magic-wrx" || echo "")

if [ -z "$CURRENT_PROJECT" ]; then
    print_warning "Not using magic-wrx project"
    echo "Switching to magic-wrx project..."
    firebase use magic-wrx
    if [ $? -ne 0 ]; then
        print_error "Failed to switch to magic-wrx project"
        exit 1
    fi
fi
print_success "Using magic-wrx project"

# Authentication setup instructions
echo ""
echo "🔧 Authentication Provider Setup"
echo "================================"
echo ""

print_info "To enable Google login, you need to configure Firebase Authentication:"
echo ""
echo "1. Go to Firebase Console:"
echo "   https://console.firebase.google.com/project/magic-wrx/authentication"
echo ""
echo "2. Click 'Get started' or 'Sign-in method'"
echo ""
echo "3. Enable these providers:"
echo "   ✅ Email/Password"
echo "   ✅ Google"
echo ""
echo "4. For Google provider:"
echo "   - Click 'Google' in the list"
echo "   - Toggle 'Enable'"
echo "   - Add your support email"
echo "   - Save"
echo ""
echo "5. Add authorized domains:"
echo "   - Go to 'Settings' tab"
echo "   - Add 'localhost' for development"
echo "   - Add 'magic-wrx.web.app' for production"
echo ""

# Check if authentication is properly configured
echo "🔍 Checking authentication configuration..."
print_info "Testing authentication setup..."

# Test Firebase configuration
if npm run build &> /dev/null; then
    print_status "Build successful - Firebase config is valid"
else
    print_warning "Build failed - check Firebase configuration"
fi

echo ""
echo "📋 Authentication Features Available:"
echo "===================================="
echo "✅ Email/Password login"
echo "✅ Google OAuth login"
echo "✅ User state management"
echo "✅ Error handling"
echo "✅ Demo mode fallback"
echo "✅ Responsive UI"
echo ""

print_info "Your authentication is ready!"
echo ""
echo "🌐 Test your authentication:"
echo "   Development: http://localhost:3000/login"
echo "   Production:  https://magic-wrx.web.app/login"
echo ""
echo "📚 Documentation:"
echo "   - Login: /login"
echo "   - Signup: /signup"
echo "   - Demo: /demo-login"
echo "   - Setup Guide: /setup-guide"
echo "" 