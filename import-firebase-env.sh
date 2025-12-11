#!/bin/bash

# Exit on any error
set -e

echo "🔥 MagicWRX Firebase Environment Variables Import"
echo "================================================"
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

# Check if Firebase CLI is installed
echo "📋 Checking Firebase CLI..."
if ! command -v firebase &> /dev/null; then
    print_warning "Firebase CLI not found. Installing..."
    npm install -g firebase-tools
    print_success "Firebase CLI installed"
else
    print_success "Firebase CLI found"
fi

# Check if logged into Firebase
echo "🔐 Checking Firebase authentication..."
if ! firebase projects:list &> /dev/null; then
    print_warning "Not logged into Firebase"
    echo "Please login to Firebase:"
    firebase login
else
    print_success "Logged into Firebase"
fi

# Get Firebase project configuration
echo "🔍 Getting Firebase project configuration..."
PROJECT_ID="magic-wrx"

# Create .env.local file with Firebase configuration
echo "📝 Creating .env.local file..."
cat > .env.local << EOF
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=magic-wrx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=magic-wrx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=magic-wrx.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=24629615626
NEXT_PUBLIC_FIREBASE_APP_ID=1:24629615626:web:f9d4d0fac5f709b996d3f3
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-RJEJT2JT5T

# Emulator Settings (for local development)
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false
NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL=http://localhost:9099
NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_URL=localhost:8080
NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_URL=localhost:9199

# Base URL for development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EOF

print_success "Created .env.local file with Firebase configuration"

# Function to add environment variable to Vercel
add_vercel_env() {
    local var_name=$1
    local var_value=$2
    local description=$3
    
    echo "📝 Adding $var_name to Vercel..."
    if vercel env add "$var_name" production <<< "$var_value" &> /dev/null; then
        print_success "Added $var_name to Vercel"
    else
        print_warning "Failed to add $var_name to Vercel (may already exist)"
    fi
}

# Check if Vercel CLI is available
if command -v vercel &> /dev/null; then
    echo ""
    print_info "Setting up Firebase environment variables in Vercel..."
    echo ""
    
    # Add Firebase environment variables to Vercel
    add_vercel_env "NEXT_PUBLIC_FIREBASE_API_KEY" "AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4" "Firebase API Key"
    add_vercel_env "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" "magic-wrx.firebaseapp.com" "Firebase Auth Domain"
    add_vercel_env "NEXT_PUBLIC_FIREBASE_PROJECT_ID" "magic-wrx" "Firebase Project ID"
    add_vercel_env "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" "magic-wrx.firebasestorage.app" "Firebase Storage Bucket"
    add_vercel_env "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" "24629615626" "Firebase Messaging Sender ID"
    add_vercel_env "NEXT_PUBLIC_FIREBASE_APP_ID" "1:24629615626:web:f9d4d0fac5f709b996d3f3" "Firebase App ID"
    add_vercel_env "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID" "G-RJEJT2JT5T" "Firebase Measurement ID"
    
    echo ""
    print_info "Firebase environment variables have been added to Vercel!"
else
    print_warning "Vercel CLI not found. Please install it first: npm install -g vercel"
    print_info "You can manually add the environment variables in the Vercel dashboard"
fi

echo ""
print_success "Firebase environment variables imported successfully!"
echo ""
print_info "What was created:"
echo "   📁 .env.local - Local development environment variables"
echo "   🔧 Vercel environment variables (if Vercel CLI was available)"
echo ""
print_info "Next steps:"
echo "   1. Add Stripe environment variables: ./setup-vercel-env.sh"
echo "   2. Test local development: npm run dev"
echo "   3. Deploy to Vercel: ./deploy-vercel.sh"
echo ""
print_info "Local development URL: http://localhost:3000"
print_info "Vercel Dashboard: https://vercel.com/dashboard" 