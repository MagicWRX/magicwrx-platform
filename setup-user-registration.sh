#!/bin/bash

# User Registration & Site Creation Setup Script
# This script helps set up the new user registration and site provisioning features

set -e

echo "🚀 MagicWRX - User Registration & Site Creation Setup"
echo "======================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the MagicWRX directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Please run this script from the MagicWRX project root${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Checking environment variables...${NC}"
if [ ! -f ".env.local" ]; then
    echo -e "${RED}Error: .env.local file not found${NC}"
    echo "Please create .env.local with required Supabase credentials"
    exit 1
fi

# Check for required environment variables
if ! grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
    echo -e "${RED}Error: NEXT_PUBLIC_SUPABASE_URL not found in .env.local${NC}"
    exit 1
fi

if ! grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
    echo -e "${RED}Error: NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env.local${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Environment variables configured${NC}"
echo ""

echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

echo -e "${YELLOW}Step 3: Database migration instructions${NC}"
echo ""
echo "To complete setup, you need to run the database migration:"
echo ""
echo "Option A: Via Supabase Dashboard (Recommended)"
echo "  1. Go to https://supabase.com/dashboard"
echo "  2. Select your project"
echo "  3. Navigate to SQL Editor"
echo "  4. Copy the contents of: supabase/migrations/001_create_sites_tables.sql"
echo "  5. Paste into the SQL Editor"
echo "  6. Click 'Run'"
echo ""
echo "Option B: Via Supabase CLI"
echo "  npx supabase db push"
echo ""
read -p "Have you run the database migration? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Please run the migration first, then run this script again${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Database migration confirmed${NC}"
echo ""

echo -e "${YELLOW}Step 4: Updating dashboard...${NC}"
cd src/app/dashboard

# Backup existing dashboard if not already backed up
if [ -f "page.tsx" ] && [ ! -f "page.backup.tsx" ]; then
    echo "  Backing up existing dashboard..."
    cp page.tsx page.backup.tsx
    echo -e "${GREEN}  ✓ Backup created: page.backup.tsx${NC}"
fi

# Replace dashboard with enhanced version
if [ -f "enhanced-page.tsx" ]; then
    echo "  Installing enhanced dashboard..."
    cp enhanced-page.tsx page.tsx
    echo -e "${GREEN}  ✓ Enhanced dashboard installed${NC}"
else
    echo -e "${YELLOW}  Note: enhanced-page.tsx not found, keeping existing dashboard${NC}"
fi

cd ../../..
echo ""

echo -e "${YELLOW}Step 5: Building application...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed. Please check errors above${NC}"
    exit 1
fi
echo ""

echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}Next Steps:${NC}"
echo ""
echo "1. Start the development server:"
echo "   npm run dev"
echo ""
echo "2. Test the onboarding flow:"
echo "   http://localhost:3000/onboarding"
echo ""
echo "3. Test user registration:"
echo "   - Create account with email/password"
echo "   - Or use Google OAuth"
echo "   - Complete business information"
echo "   - Select a template"
echo ""
echo "4. Verify dashboard:"
echo "   http://localhost:3000/dashboard"
echo "   - Should show your created site"
echo "   - Test publish/unpublish"
echo "   - Try creating additional sites"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}Troubleshooting:${NC}"
echo ""
echo "If you encounter issues:"
echo "  - Check the implementation guide: docs/USER_REGISTRATION_IMPLEMENTATION.md"
echo "  - Verify database tables exist in Supabase Dashboard"
echo "  - Check browser console for errors"
echo "  - Ensure RLS policies are enabled"
echo ""
echo "For detailed testing checklist, see:"
echo "  docs/USER_REGISTRATION_IMPLEMENTATION.md#testing-checklist"
echo ""
echo -e "${GREEN}Happy building! 🚀${NC}"
