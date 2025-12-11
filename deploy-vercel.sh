#!/bin/bash

# Exit on any error
set -e

echo "🚀 MagicWRX Vercel Deployment Script"
echo "===================================="
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

# Check if project is linked to Vercel
echo "🔗 Checking Vercel project link..."
if [ ! -f ".vercel/project.json" ]; then
    print_warning "Project not linked to Vercel"
    echo "Linking project to Vercel..."
    vercel link
else
    print_success "Project linked to Vercel"
fi

# Check environment variables
echo "🔧 Checking environment variables..."
if [ -f ".env.local" ]; then
    print_success "Local environment file found"
    print_info "Make sure to set up environment variables in Vercel dashboard"
else
    print_warning "No .env.local found"
    print_info "Create .env.local with your environment variables"
fi

# Build the project
echo "🔨 Building Next.js project..."
if ! npm run build; then
    print_error "Build failed"
    echo "Check for TypeScript or ESLint errors"
    exit 1
fi
print_success "Build completed successfully"

# Deploy to Vercel
echo "☁️  Deploying to Vercel..."
print_warning "Note: If deployment fails due to missing environment variables,"
print_warning "run: ./setup-vercel-env.sh to set them up"
echo ""

if vercel --prod; then
    print_success "Deployment successful!"
    echo ""
    print_info "Your site is now live on Vercel!"
    echo ""
    print_info "Next steps:"
    echo "   1. Set up environment variables in Vercel dashboard"
    echo "   2. Configure custom domain if needed"
    echo "   3. Set up automatic deployments from GitHub"
    echo ""
    print_info "Vercel Dashboard: https://vercel.com/dashboard"
else
    print_error "Deployment failed"
    echo ""
    print_info "Common issues:"
    echo "   1. Missing environment variables - run: ./setup-vercel-env.sh"
    echo "   2. Build errors - check the logs above"
    echo "   3. Authentication issues - run: vercel login"
    echo ""
    print_info "Check Vercel dashboard for detailed error logs"
    exit 1
fi 