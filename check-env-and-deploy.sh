#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}
print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}
print_error() {
  echo -e "${RED}❌ $1${NC}"
}

# 1. Check .env.local for quotes
if [ -f .env.local ]; then
  echo "Checking .env.local for quoted values..."
  if grep -q '="' .env.local; then
    print_warning ".env.local contains quoted values. Please remove all double quotes from values."
    grep '="' .env.local
    print_error "Fix .env.local before deploying."
    exit 1
  else
    print_success ".env.local has no quoted values."
  fi
else
  print_warning ".env.local not found. Skipping local check."
fi

# 2. Check Vercel envs for quotes
echo "Checking Vercel environment variables for quoted values..."
vercel env pull .vercel.env.tmp > /dev/null 2>&1
if grep -q '="' .vercel.env.tmp; then
  print_warning "Vercel environment variables contain quoted values. Please remove all double quotes from values in the Vercel dashboard."
  grep '="' .vercel.env.tmp
  rm .vercel.env.tmp
  print_error "Fix Vercel environment variables before deploying."
  exit 1
else
  print_success "Vercel environment variables have no quoted values."
  rm .vercel.env.tmp
fi

# 3. Build
print_success "Building project..."
npm run build

# 4. Deploy
print_success "Deploying to Vercel..."
vercel --prod
print_success "Deployment complete!" 