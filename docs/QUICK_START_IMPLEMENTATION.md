# Quick Start Implementation Guide

## 🚀 **Immediate Actions (This Week)**

### **1. Install Required Dependencies**
```bash
# Install Stripe and Firebase Functions
npm install stripe @stripe/stripe-js firebase-functions
npm install --save-dev @types/stripe

# Install additional UI components
npm install @headlessui/react @heroicons/react
npm install react-hook-form @hookform/resolvers zod
npm install date-fns react-hot-toast
```

### **2. Set Up Stripe Account**
1. Create Stripe account at https://stripe.com
2. Get API keys from Stripe Dashboard
3. Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### **3. Create User Dashboard**
```typescript
// src/app/dashboard/page.tsx
'use client'

import { useAuthState } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function DashboardPage() {
  const { user, loading } = useAuthState()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (user) {
      // Fetch user data from Firestore
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data())
        }
      }
      fetchUserData()
    }
  }, [user])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please log in</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Subscription Status */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Subscription</h2>
        {/* Subscription details */}
      </div>

      {/* Active Tools */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Tools</h2>
        {/* Tool access list */}
      </div>

      {/* Template Downloads */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Template Downloads</h2>
        {/* Download history */}
      </div>
    </div>
  )
}
```

### **4. Create Stripe Checkout Component**
```typescript
// src/components/CheckoutForm.tsx
'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useAuthState } from '@/hooks/useAuth'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutForm({ plan }: { plan: string }) {
  const { user } = useAuthState()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          userId: user.uid,
          email: user.email
        })
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Processing...' : `Subscribe to ${plan}`}
    </button>
  )
}
```

### **5. Create API Route for Stripe**
```typescript
// src/app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

export async function POST(request: NextRequest) {
  try {
    const { plan, userId, email } = await request.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: getPriceId(plan), // Map plan to Stripe price ID
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/dashboard?success=true`,
      cancel_url: `${request.nextUrl.origin}/pricing?canceled=true`,
      customer_email: email,
      metadata: {
        userId,
        plan
      }
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}

function getPriceId(plan: string): string {
  const prices = {
    starter: 'price_starter_monthly',
    professional: 'price_professional_monthly',
    enterprise: 'price_enterprise_monthly'
  }
  return prices[plan as keyof typeof prices] || prices.starter
}
```

### **6. Update Pricing Page with Checkout**
```typescript
// Update src/app/pricing/page.tsx
import CheckoutForm from '@/components/CheckoutForm'

// Add to each plan's action button:
<CheckoutForm plan={plan.name.toLowerCase()} />
```

### **7. Create Basic Tool Interface**
```typescript
// src/app/tools/ecommerce/page.tsx
'use client'

import { useAuthState } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'

export default function EcommerceTool() {
  const { user } = useAuthState()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // Fetch user's e-commerce data
      fetchEcommerceData()
    }
  }, [user])

  const fetchEcommerceData = async () => {
    // Fetch products from Firestore
    setLoading(false)
  }

  if (!user) return <div>Please log in to access this tool</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">E-commerce Tools</h1>
      
      {/* Product Management */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {/* Product list and management */}
      </div>

      {/* Orders */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        {/* Order management */}
      </div>

      {/* Analytics */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        {/* Sales analytics */}
      </div>
    </div>
  )
}
```

## 🔧 **Week 1 Implementation Checklist**

### **Day 1-2: Foundation**
- [ ] Install dependencies
- [ ] Set up Stripe account and API keys
- [ ] Create user dashboard page
- [ ] Set up Firestore security rules

### **Day 3-4: Payment Integration**
- [ ] Create Stripe checkout component
- [ ] Implement checkout API route
- [ ] Update pricing page with checkout
- [ ] Test payment flow

### **Day 5-7: Basic Tool Framework**
- [ ] Create tool access control
- [ ] Build basic e-commerce tool interface
- [ ] Set up tool data structure
- [ ] Implement user authentication checks

## 📊 **Success Metrics**

### **Week 1 Goals:**
- [ ] Users can subscribe to plans
- [ ] Payment processing works
- [ ] User dashboard displays subscription status
- [ ] Basic tool access control implemented
- [ ] E-commerce tool interface created

### **Week 2 Goals:**
- [ ] Template download system
- [ ] Blog tool implementation
- [ ] User analytics tracking
- [ ] Admin dashboard improvements

## 🚨 **Critical Security Notes**

1. **Environment Variables:** Never commit API keys to git
2. **Webhook Verification:** Always verify Stripe webhook signatures
3. **User Authentication:** Check user permissions for all tool access
4. **Data Validation:** Validate all user inputs
5. **Error Handling:** Implement proper error handling for payments

## 📞 **Support Resources**

- **Stripe Documentation:** https://stripe.com/docs
- **Firebase Functions:** https://firebase.google.com/docs/functions
- **Next.js API Routes:** https://nextjs.org/docs/api-routes/introduction

This quick start guide will get you up and running with basic payment processing and tool access within a week! 