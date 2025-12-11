#!/bin/bash

# Core Functionality Test Script for Magic WRX
echo "🧪 Starting Core Functionality Tests for Magic WRX"
echo "=================================================="

BASE_URL="http://localhost:3000"
PRODUCTION_URL="https://magic-g7ua1cnfl-magicwrxs-projects.vercel.app"

# Function to test URL response
test_url() {
    local url=$1
    local expected_code=${2:-200}
    local description=$3
    
    echo -n "Testing $description... "
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    
    if [ "$response" = "$expected_code" ]; then
        echo "✅ PASS ($response)"
        return 0
    else
        echo "❌ FAIL ($response, expected $expected_code)"
        return 1
    fi
}

# Function to test if content exists on page
test_content() {
    local url=$1
    local search_term=$2
    local description=$3
    
    echo -n "Testing $description... "
    if curl -s "$url" 2>/dev/null | grep -i "$search_term" > /dev/null; then
        echo "✅ PASS (content found)"
        return 0
    else
        echo "❌ FAIL (content not found)"
        return 1
    fi
}

echo ""
echo "📍 Testing Local Development Server ($BASE_URL)"
echo "-----------------------------------------------"

# Test core pages
test_url "$BASE_URL" 200 "Homepage"
test_url "$BASE_URL/login" 200 "Login Page"
test_url "$BASE_URL/signup" 200 "Signup Page"
test_url "$BASE_URL/demo-login" 200 "Demo Login Page"
test_url "$BASE_URL/pricing" 200 "Pricing Page"
test_url "$BASE_URL/templates" 200 "Templates Page"
test_url "$BASE_URL/contact" 200 "Contact Page"
test_url "$BASE_URL/dashboard" 200 "Dashboard Page"
test_url "$BASE_URL/admin" 200 "Admin Page"

# Test API endpoints
echo ""
echo "🔗 Testing API Endpoints"
echo "------------------------"
test_url "$BASE_URL/api/stripe/checkout" 405 "Stripe Checkout API (POST expected)"
test_url "$BASE_URL/api/stripe/portal" 405 "Stripe Portal API (POST expected)"

# Test content presence
echo ""
echo "📄 Testing Page Content"
echo "-----------------------"
test_content "$BASE_URL/pricing" "Magic WRX" "Pricing page has app name"
test_content "$BASE_URL/templates" "template" "Templates page has template content"
test_content "$BASE_URL/demo-login" "Demo Mode" "Demo login has demo content"

echo ""
echo "🌐 Testing Production Deployment ($PRODUCTION_URL)"
echo "------------------------------------------------"

# Test core pages in production
test_url "$PRODUCTION_URL" 200 "Production Homepage"
test_url "$PRODUCTION_URL/login" 200 "Production Login Page"
test_url "$PRODUCTION_URL/pricing" 200 "Production Pricing Page"
test_url "$PRODUCTION_URL/templates" 200 "Production Templates Page"

echo ""
echo "🔒 Testing Security"
echo "-------------------"

# Test that protected routes return appropriate responses
test_url "$BASE_URL/admin/dashboard" 200 "Admin Dashboard Access"
test_url "$BASE_URL/sites/new" 200 "New Site Access"

echo ""
echo "📊 Test Summary"
echo "==============="
echo "Tests completed. Review results above."
echo ""
echo "🚀 Next Steps:"
echo "1. Fix any failing tests"
echo "2. Test authentication flows manually"
echo "3. Test Stripe integration with test cards"
echo "4. Verify email functionality"
echo ""
