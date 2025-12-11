#!/bin/bash

# Exit on any error
set -e

echo "🚀 MagicWRX Firebase Deployment Script"
echo "======================================"
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

# Function to handle errors
handle_error() {
    print_error "Script failed at line $1"
    exit 1
}

# Set error trap
trap 'handle_error $LINENO' ERR

# Check if logged into correct Firebase account
echo "📋 Checking Firebase account..."
CURRENT_USER=$(firebase login:list 2>/dev/null | grep "magicwrxstudio@gmail.com" || echo "")

if [ -z "$CURRENT_USER" ]; then
    print_warning "You need to login to Firebase with MagicWRXStudio@gmail.com"
    echo "   Run: ./firebase-switch.sh"
    echo "   Select option 2 to login as MagicWRXStudio@gmail.com"
    exit 1
fi
print_success "Logged in as MagicWRXStudio@gmail.com"

# Check if Firebase project exists
echo "🔍 Checking Firebase project..."
if ! firebase projects:list | grep -q "magic-wrx"; then
    print_error "Firebase project 'magic-wrx' not found"
    echo "   Please create the project at https://console.firebase.google.com"
    echo "   Or update .firebaserc with the correct project ID"
    exit 1
fi
print_success "Firebase project 'magic-wrx' found"

# Check current project
echo "🏗️  Checking current project..."
CURRENT_PROJECT=$(firebase use 2>/dev/null | grep "magic-wrx" || echo "")

if [ -z "$CURRENT_PROJECT" ]; then
    print_warning "Not using magic-wrx project"
    echo "Switching to magic-wrx project..."
    if ! firebase use magic-wrx; then
        print_error "Failed to switch to magic-wrx project"
        exit 1
    fi
fi
print_success "Using magic-wrx project"

# Check authentication configuration
echo "🔐 Checking authentication configuration..."
if grep -q "GoogleAuthProvider" src/app/login/page.tsx; then
    print_success "Google authentication is configured"
else
    print_warning "Google authentication may not be configured"
fi

# Build the project
echo "🔨 Building Next.js project..."
if ! npm run build; then
    print_error "Build failed"
    echo "Check for TypeScript or ESLint errors"
    exit 1
fi
print_success "Build completed successfully"

# Deploy to Firebase
echo "☁️  Deploying to Firebase Hosting..."
if firebase deploy; then
    print_success "Deployment successful!"
    echo ""
    echo "🌐 Your site is live at: https://magic-wrx.web.app"
    echo ""
    echo "📋 Authentication URLs:"
    echo "   Login: https://magic-wrx.web.app/login"
    echo "   Signup: https://magic-wrx.web.app/signup"
    echo "   Demo: https://magic-wrx.web.app/demo-login"
    echo ""
    echo "🔧 Firebase Console:"
    echo "   https://console.firebase.google.com/project/magic-wrx"
    echo ""
    print_info "Don't forget to configure Google Auth in Firebase Console!"
else
    print_error "Deployment failed"
    echo "Check Firebase console for errors"
    exit 1
fi
