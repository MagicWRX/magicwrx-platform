#!/bin/bash

# Stripe Integration Test
echo "💳 Testing Stripe Integration"
echo "============================="

BASE_URL="http://localhost:3002"

# Test if Stripe is loaded on pricing page
echo -n "Testing Stripe SDK loading... "
if curl -s "$BASE_URL/pricing" | grep -i "stripe\|checkout" > /dev/null; then
    echo "✅ PASS (Stripe references found)"
else
    echo "❌ FAIL (No Stripe references found)"
fi

# Test Stripe API endpoint responses
echo -n "Testing Stripe checkout endpoint... "
response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/stripe/checkout" -H "Content-Type: application/json" -d '{"priceId":"test"}' 2>/dev/null)
if [ "$response" = "200" ] || [ "$response" = "400" ] || [ "$response" = "401" ]; then
    echo "✅ PASS (Endpoint accessible - $response)"
else
    echo "❌ FAIL (Unexpected response - $response)"
fi

echo -n "Testing Stripe portal endpoint... "
response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/stripe/portal" -H "Content-Type: application/json" 2>/dev/null)
if [ "$response" = "200" ] || [ "$response" = "400" ] || [ "$response" = "401" ]; then
    echo "✅ PASS (Endpoint accessible - $response)"
else
    echo "❌ FAIL (Unexpected response - $response)"
fi

echo ""
echo "🔑 Environment Variables Check"
echo "-----------------------------"

# Check if Stripe keys are set (locally)
if [ -f ".env.local" ]; then
    echo -n "Checking Stripe publishable key... "
    if grep -q "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_" .env.local; then
        echo "✅ PASS (Key found)"
    else
        echo "❌ FAIL (Key not found or invalid)"
    fi
    
    echo -n "Checking Stripe secret key... "
    if grep -q "STRIPE_SECRET_KEY=sk_" .env.local; then
        echo "✅ PASS (Key found)"
    else
        echo "❌ FAIL (Key not found or invalid)"
    fi
else
    echo "❌ .env.local not found"
fi

echo ""
echo "📧 Email Service Test"
echo "---------------------"

echo -n "Checking Resend API key... "
if grep -q "RESEND_API_KEY=re_" .env.local; then
    echo "✅ PASS (Key found)"
else
    echo "❌ FAIL (Key not found or invalid)"
fi

echo ""
echo "🗄️ Database Service Test"
echo "------------------------"

echo -n "Checking Supabase URL... "
if grep -q "NEXT_PUBLIC_SUPABASE_URL=https://" .env.local; then
    echo "✅ PASS (URL found)"
else
    echo "❌ FAIL (URL not found or invalid)"
fi

echo -n "Checking Supabase anon key... "
if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ" .env.local; then
    echo "✅ PASS (Key found)"
else
    echo "❌ FAIL (Key not found or invalid)"
fi

echo ""
echo "🔥 Firebase Service Test"
echo "------------------------"

echo -n "Checking Firebase API key... "
if grep -q "NEXT_PUBLIC_FIREBASE_API_KEY=AIza" .env.local; then
    echo "✅ PASS (Key found)"
else
    echo "❌ FAIL (Key not found or invalid)"
fi

echo ""
echo "🚀 Integration Test Summary"
echo "============================"
echo "All core services appear to be configured."
echo "Manual testing recommended for:"
echo "- User registration flow"
echo "- Payment processing with test cards"
echo "- Email delivery"
echo "- Database operations"
