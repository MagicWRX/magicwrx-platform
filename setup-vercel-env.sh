#!/bin/bash

# Exit on any error
set -e

echo "🔧 MagicWRX Vercel Environment Variables Setup"
echo "=============================================="
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

# Check if Vercel CLI is installed
echo "📋 Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI not found. Please install it first: npm install -g vercel"
    exit 1
fi
print_success "Vercel CLI found"

# Check if logged into Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    print_error "Not logged into Vercel. Please run: vercel login"
    exit 1
fi
print_success "Logged into Vercel"

# Check if project is linked
echo "🔗 Checking project link..."
if [ ! -f ".vercel/project.json" ]; then
    print_error "Project not linked to Vercel. Please run: vercel link"
    exit 1
fi
print_success "Project linked to Vercel"

echo ""
print_info "Setting up environment variables..."
echo "You'll be prompted to enter values for each environment variable."
echo "Press Enter to skip any variable you don't want to set right now."
echo ""

# Firebase Environment Variables
echo "🔥 Firebase Environment Variables:"
echo ""

# Function to add environment variable
add_env_var() {
    local var_name=$1
    local description=$2
    
    echo "📝 $description"
    echo "Variable: $var_name"
    read -p "Enter value (or press Enter to skip): " value
    
    if [ ! -z "$value" ]; then
        if vercel env add "$var_name" production; then
            print_success "Added $var_name"
        else
            print_error "Failed to add $var_name"
        fi
    else
        print_warning "Skipped $var_name"
    fi
    echo ""
}

# Firebase variables
add_env_var "NEXT_PUBLIC_FIREBASE_API_KEY" "Firebase API Key (from Firebase Console)"
add_env_var "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" "Firebase Auth Domain (e.g., magic-wrx.firebaseapp.com)"
add_env_var "NEXT_PUBLIC_FIREBASE_PROJECT_ID" "Firebase Project ID (e.g., magic-wrx)"
add_env_var "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" "Firebase Storage Bucket (e.g., magic-wrx.appspot.com)"
add_env_var "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" "Firebase Messaging Sender ID"
add_env_var "NEXT_PUBLIC_FIREBASE_APP_ID" "Firebase App ID"

echo "🔐 Firebase Service Account Variables:"
echo ""

add_env_var "FIREBASE_PRIVATE_KEY" "Firebase Service Account Private Key (from service account JSON)"
add_env_var "FIREBASE_CLIENT_EMAIL" "Firebase Service Account Email (from service account JSON)"

echo "💳 Stripe Environment Variables:"
echo ""

add_env_var "STRIPE_SECRET_KEY" "Stripe Secret Key (starts with sk_)"
add_env_var "STRIPE_WEBHOOK_SECRET" "Stripe Webhook Secret (starts with whsec_)"
add_env_var "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "Stripe Publishable Key (starts with pk_)"

echo ""
print_success "Environment variables setup completed!"
echo ""
print_info "Next steps:"
echo "   1. Verify variables in Vercel dashboard: https://vercel.com/dashboard"
echo "   2. Deploy your project: ./deploy-vercel.sh"
echo "   3. Test your deployment"
echo ""
print_info "Note: You can also set environment variables directly in the Vercel dashboard"
print_info "Dashboard: https://vercel.com/dashboard" 