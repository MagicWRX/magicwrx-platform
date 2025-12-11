#!/bin/bash

# Exit on any error
set -e

echo "🚀 MagicWRX Complete Vercel CLI Setup"
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

# Check if Vercel CLI is installed
echo "📋 Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI not found. Please install it first: npm install -g vercel"
    exit 1
fi
print_success "Vercel CLI found: $(vercel --version)"

# Check if logged into Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    print_warning "Not logged into Vercel"
    echo "Please login to Vercel:"
    vercel login
else
    print_success "Logged into Vercel as: $(vercel whoami)"
fi

# Check if project is linked
echo "🔗 Checking project link..."
if [ ! -f ".vercel/project.json" ]; then
    print_warning "Project not linked to Vercel"
    echo "Linking project to Vercel..."
    vercel link
else
    print_success "Project already linked to Vercel"
fi

# Function to add environment variable
add_env_var() {
    local var_name=$1
    local var_value=$2
    local description=$3
    
    echo "📝 Adding $description..."
    echo "Variable: $var_name"
    
    # Add to production environment
    if echo "$var_value" | vercel env add "$var_name" production &> /dev/null; then
        print_success "Added $var_name to production"
    else
        print_warning "$var_name may already exist in production"
    fi
    
    # Add to preview environment
    if echo "$var_value" | vercel env add "$var_name" preview &> /dev/null; then
        print_success "Added $var_name to preview"
    else
        print_warning "$var_name may already exist in preview"
    fi
    
    # Add to development environment
    if echo "$var_value" | vercel env add "$var_name" development &> /dev/null; then
        print_success "Added $var_name to development"
    else
        print_warning "$var_name may already exist in development"
    fi
    
    echo ""
}

echo ""
print_info "Setting up environment variables via CLI..."
echo ""

# Firebase Environment Variables
echo "🔥 Firebase Environment Variables:"
echo ""

add_env_var "NEXT_PUBLIC_FIREBASE_API_KEY" "AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4" "Firebase API Key"
add_env_var "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" "magic-wrx.firebaseapp.com" "Firebase Auth Domain"
add_env_var "NEXT_PUBLIC_FIREBASE_PROJECT_ID" "magic-wrx" "Firebase Project ID"
add_env_var "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" "magic-wrx.firebasestorage.app" "Firebase Storage Bucket"
add_env_var "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" "24629615626" "Firebase Messaging Sender ID"
add_env_var "NEXT_PUBLIC_FIREBASE_APP_ID" "1:24629615626:web:f9d4d0fac5f709b996d3f3" "Firebase App ID"
add_env_var "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID" "G-RJEJT2JT5T" "Firebase Measurement ID"

echo "🔐 Firebase Service Account Variables:"
echo ""

print_warning "For Firebase service account variables, you'll need to provide the values:"
echo "   - FIREBASE_PRIVATE_KEY (from your service account JSON)"
echo "   - FIREBASE_CLIENT_EMAIL (from your service account JSON)"
echo ""

read -p "Do you want to add Firebase service account variables now? (y/n): " add_service_account

if [[ $add_service_account =~ ^[Yy]$ ]]; then
    read -p "Enter FIREBASE_PRIVATE_KEY: " firebase_private_key
    read -p "Enter FIREBASE_CLIENT_EMAIL: " firebase_client_email
    
    if [ ! -z "$firebase_private_key" ]; then
        add_env_var "FIREBASE_PRIVATE_KEY" "$firebase_private_key" "Firebase Service Account Private Key"
    fi
    
    if [ ! -z "$firebase_client_email" ]; then
        add_env_var "FIREBASE_CLIENT_EMAIL" "$firebase_client_email" "Firebase Service Account Email"
    fi
fi

echo "💳 Stripe Environment Variables:"
echo ""

print_warning "For Stripe variables, you'll need to provide the values:"
echo "   - STRIPE_SECRET_KEY (starts with sk_)"
echo "   - STRIPE_WEBHOOK_SECRET (starts with whsec_)"
echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (starts with pk_)"
echo ""

read -p "Do you want to add Stripe variables now? (y/n): " add_stripe

if [[ $add_stripe =~ ^[Yy]$ ]]; then
    read -p "Enter STRIPE_SECRET_KEY: " stripe_secret_key
    read -p "Enter STRIPE_WEBHOOK_SECRET: " stripe_webhook_secret
    read -p "Enter NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: " stripe_publishable_key
    
    if [ ! -z "$stripe_secret_key" ]; then
        add_env_var "STRIPE_SECRET_KEY" "$stripe_secret_key" "Stripe Secret Key"
    fi
    
    if [ ! -z "$stripe_webhook_secret" ]; then
        add_env_var "STRIPE_WEBHOOK_SECRET" "$stripe_webhook_secret" "Stripe Webhook Secret"
    fi
    
    if [ ! -z "$stripe_publishable_key" ]; then
        add_env_var "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "$stripe_publishable_key" "Stripe Publishable Key"
    fi
fi

# Test build
echo "🔨 Testing build..."
if npm run build; then
    print_success "Build test successful"
else
    print_error "Build test failed"
    echo "Please fix any build errors before deploying"
    exit 1
fi

# Deploy to preview
echo "🚀 Deploying to preview..."
if vercel; then
    print_success "Preview deployment successful!"
    echo ""
    print_info "Preview URL will be shown above"
else
    print_error "Preview deployment failed"
    exit 1
fi

echo ""
print_success "Vercel CLI setup completed successfully!"
echo ""
print_info "Next steps:"
echo "   1. Test your preview deployment"
echo "   2. Deploy to production: vercel --prod"
echo "   3. Set up custom domain if needed"
echo "   4. Configure automatic deployments"
echo ""
print_info "Useful CLI commands:"
echo "   vercel --prod          # Deploy to production"
echo "   vercel ls              # List deployments"
echo "   vercel logs            # View deployment logs"
echo "   vercel domains ls      # List domains"
echo "   vercel env ls          # List environment variables"
echo ""
print_info "Vercel Dashboard: https://vercel.com/dashboard" 