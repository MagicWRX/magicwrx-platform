#!/bin/bash

# Exit on any error
set -e

echo "🔐 Auth Tool Vercel Deployment Script"
echo "====================================="
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

# Change to auth-tool directory
cd "$(dirname "$0")"

print_info "Working directory: $(pwd)"

# Check if Vercel CLI is installed
echo "📋 Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
    print_success "Vercel CLI installed"
else
    print_success "Vercel CLI found"
fi

# Check if logged into Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    print_warning "Not logged into Vercel"
    echo "Please login to Vercel:"
    vercel login
else
    print_success "Logged into Vercel"
fi

# Install dependencies
echo "📦 Installing dependencies..."
if npm install; then
    print_success "Dependencies installed"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Build the project
echo "🔨 Building Next.js project..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Deploy to Vercel
echo "☁️  Deploying Auth Tool to Vercel..."
print_info "This will create a new Vercel project for the Auth Tool"
echo ""

if vercel --prod; then
    print_success "Auth Tool deployment successful!"
    echo ""
    print_info "🎉 Your Auth Tool is now live on Vercel!"
    echo ""
    print_info "Next steps:"
    echo "   1. Note the deployment URL for your records"
    echo "   2. Set up environment variables if needed"
    echo "   3. Configure custom domain for auth.yourdomain.com"
    echo "   4. Implement Firebase Authentication"
    echo "   5. Set up OAuth providers"
    echo ""
    print_info "Vercel Dashboard: https://vercel.com/dashboard"
else
    print_error "Deployment failed"
    echo ""
    print_info "Troubleshooting:"
    echo "   1. Check build errors above"
    echo "   2. Verify Vercel authentication: vercel login"
    echo "   3. Check Vercel dashboard for detailed logs"
    exit 1
fi
