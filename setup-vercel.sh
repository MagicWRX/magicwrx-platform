#!/bin/bash

# Exit on any error
set -e

echo "🚀 MagicWRX Vercel Setup Script"
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

# Function to handle errors
handle_error() {
    print_error "Script failed at line $1"
    exit 1
}

# Set error trap
trap 'handle_error $LINENO' ERR

# Check if Node.js is installed
echo "📋 Checking Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js not found. Please install Node.js 18 or higher."
    exit 1
fi
print_success "Node.js found: $(node --version)"

# Check if npm is installed
echo "📦 Checking npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm not found. Please install npm."
    exit 1
fi
print_success "npm found: $(npm --version)"

# Install dependencies
echo "📦 Installing project dependencies..."
if npm install; then
    print_success "Dependencies installed"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Check if Vercel CLI is installed
echo "📋 Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    if npm install -g vercel; then
        print_success "Vercel CLI installed"
    else
        print_error "Failed to install Vercel CLI"
        exit 1
    fi
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

# Build test
echo "🔨 Testing build..."
if npm run build; then
    print_success "Build test successful"
else
    print_error "Build test failed"
    echo "Please fix any build errors before deploying"
    exit 1
fi

print_success "Setup completed successfully!"
echo ""
print_info "Next steps:"
echo "   1. Set up environment variables in Vercel dashboard"
echo "   2. Run: ./deploy-vercel.sh to deploy"
echo "   3. Configure custom domain if needed"
echo ""
print_info "Vercel Dashboard: https://vercel.com/dashboard"
print_info "Setup Guide: VERCEL_SETUP.md" 