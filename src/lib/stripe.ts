import { loadStripe } from '@stripe/stripe-js'

// Client-side Stripe instance
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

// Server-side Stripe instance
import Stripe from 'stripe'

export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-06-30.basil',
    })
  : null

// Product configurations
export const PRODUCTS = {
  basic: {
    name: 'Basic Plan',
    price: 1999, // $19.99 in cents
    interval: 'month',
    features: [
      '5 sites',
      'Premium templates',
      'Custom domain',
      'No ads',
      'Basic analytics',
      '2GB storage',
      'Email support',
    ],
  },
  pro: {
    name: 'Pro Plan',
    price: 3999, // $39.99 in cents
    interval: 'month',
    features: [
      'Unlimited sites',
      'Advanced templates',
      'Advanced analytics',
      'Priority support',
      '10GB storage',
      'E-commerce features',
      'API access',
    ],
  },
  enterprise: {
    name: 'Enterprise Plan',
    price: 7999, // $79.99 in cents
    interval: 'month',
    features: [
      'Everything in Pro',
      'White-label solution',
      'Dedicated support',
      'Custom integrations',
      'Advanced security',
      'SLA guarantee',
      'Onboarding included',
    ],
  },
}

// Create Stripe checkout session
export const createCheckoutSession = async (priceId: string, customerEmail?: string) => {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.')
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        plan: priceId.includes('basic') ? 'basic' : priceId.includes('pro') ? 'pro' : 'enterprise',
      },
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Create customer portal session
export const createPortalSession = async (customerId: string) => {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.')
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    })

    return session
  } catch (error) {
    console.error('Error creating portal session:', error)
    throw error
  }
} 