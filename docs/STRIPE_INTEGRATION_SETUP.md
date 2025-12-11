# Stripe Payment Integration Setup Guide

## Overview

This guide will help you set up Stripe payments for the MagicWRX platform, enabling subscription billing for the freemium model.

## Prerequisites

1. **Stripe Account**: Create a Stripe account at [stripe.com](https://stripe.com)
2. **Firebase Project**: Ensure your Firebase project is configured
3. **Environment Variables**: Set up the required environment variables

## Step 1: Environment Variables Setup

Create or update your `.env.local` file:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Base URL for redirects
NEXT_PUBLIC_BASE_URL=https://magic-wrx.web.app
```

## Step 2: Stripe Dashboard Setup

### 2.1 Create Products and Prices

1. **Log into Stripe Dashboard**
2. **Go to Products** → **Add Product**
3. **Create the following products:**

#### Basic Plan ($19.99/month)
- Product Name: `Basic Plan`
- Price: `$19.99`
- Billing: `Recurring`
- Interval: `Monthly`
- Note the Price ID (e.g., `price_1ABC123DEF456`)

#### Pro Plan ($39.99/month)
- Product Name: `Pro Plan`
- Price: `$39.99`
- Billing: `Recurring`
- Interval: `Monthly`
- Note the Price ID (e.g., `price_1ABC123DEF789`)

#### Enterprise Plan ($79.99/month)
- Product Name: `Enterprise Plan`
- Price: `$79.99`
- Billing: `Recurring`
- Interval: `Monthly`
- Note the Price ID (e.g., `price_1ABC123DEF012`)

### 2.2 Update Price IDs in Code

Update the price IDs in `src/app/pricing/page.tsx`:

```typescript
{
  name: 'Basic',
  price: '$19.99',
  description: 'Best for growing businesses',
  features: [...],
  popular: true,
  cta: 'Start Free Trial',
  href: '/signup?plan=basic',
  priceId: 'price_1ABC123DEF456', // Replace with your actual Stripe price ID
},
{
  name: 'Pro',
  price: '$39.99',
  description: 'For serious businesses',
  features: [...],
  popular: false,
  cta: 'Start Free Trial',
  href: '/signup?plan=pro',
  priceId: 'price_1ABC123DEF789', // Replace with your actual Stripe price ID
},
{
  name: 'Enterprise',
  price: '$79.99',
  description: 'For large organizations',
  features: [...],
  popular: false,
  cta: 'Contact Sales',
  href: '/contact',
  priceId: 'price_1ABC123DEF012', // Replace with your actual Stripe price ID
},
```

## Step 3: Webhook Configuration

### 3.1 Create Webhook Endpoint

1. **Go to Stripe Dashboard** → **Developers** → **Webhooks**
2. **Click "Add endpoint"**
3. **Endpoint URL**: `https://magic-wrx.web.app/api/stripe/webhook`
4. **Events to send**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### 3.2 Get Webhook Secret

1. **After creating the webhook**, click on it
2. **Copy the signing secret** (starts with `whsec_`)
3. **Add it to your environment variables**:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

## Step 4: Firebase Security Rules

Update your Firestore security rules to handle subscription data:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Sites belong to users
    match /sites/{siteId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Subscriptions are managed by the system
    match /subscriptions/{subscriptionId} {
      allow read: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      allow write: if false; // Only system can write
    }
  }
}
```

## Step 5: Testing the Integration

### 5.1 Test Cards

Use these test card numbers in Stripe test mode:

- **Successful Payment**: `4242 4242 4242 4242`
- **Declined Payment**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

### 5.2 Test Flow

1. **Visit your pricing page**
2. **Click "Start Free Trial" on any paid plan**
3. **Complete the Stripe checkout**
4. **Verify subscription is created in Stripe Dashboard**
5. **Check Firestore for updated user subscription**

## Step 6: Production Deployment

### 6.1 Switch to Live Mode

1. **In Stripe Dashboard**, switch from "Test mode" to "Live mode"
2. **Update environment variables** with live keys:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
   STRIPE_SECRET_KEY=sk_live_your_live_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret_here
   ```

### 6.2 Update Webhook URL

1. **Update webhook endpoint URL** to your production domain
2. **Recreate webhook** with production signing secret

### 6.3 Deploy

```bash
npm run build
firebase deploy --only hosting
```

## Step 7: Subscription Management

### 7.1 Customer Portal

Users can manage their subscriptions through the Stripe Customer Portal:

```typescript
// Add to dashboard or account settings
const handleManageSubscription = async () => {
  const response = await fetch('/api/stripe/portal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId: user.stripeCustomerId }),
  })
  
  const { url } = await response.json()
  window.location.href = url
}
```

### 7.2 Subscription Status Check

```typescript
// Check user subscription status
const checkSubscriptionStatus = (user: any) => {
  if (!user.subscription) return 'free'
  
  switch (user.subscription.status) {
    case 'active':
      return user.subscription.plan
    case 'past_due':
      return 'past_due'
    case 'canceled':
      return 'canceled'
    default:
      return 'free'
  }
}
```

## Step 8: Analytics and Monitoring

### 8.1 Stripe Dashboard

Monitor your payments in the Stripe Dashboard:
- **Payments**: Track successful and failed payments
- **Customers**: View customer information and subscription history
- **Analytics**: Revenue metrics and growth trends

### 8.2 Custom Analytics

Track subscription events in your application:

```typescript
// Track subscription events
const trackSubscriptionEvent = (event: string, plan: string) => {
  // Send to your analytics service
  analytics.track(event, { plan, timestamp: new Date() })
}

// Usage examples
trackSubscriptionEvent('subscription_started', 'basic')
trackSubscriptionEvent('subscription_canceled', 'pro')
```

## Troubleshooting

### Common Issues

1. **Webhook Not Receiving Events**
   - Check webhook endpoint URL is correct
   - Verify webhook secret in environment variables
   - Test with Stripe CLI

2. **Payment Failing**
   - Check Stripe keys are correct
   - Verify price IDs exist in Stripe
   - Test with Stripe test cards

3. **Subscription Not Updating**
   - Check Firestore security rules
   - Verify webhook is processing events
   - Check user authentication

### Testing with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local development
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Security Considerations

1. **Never expose secret keys** in client-side code
2. **Always verify webhook signatures** before processing
3. **Use HTTPS** for all webhook endpoints
4. **Implement proper error handling** for failed payments
5. **Store sensitive data** in Firestore with proper security rules

## Next Steps

1. **Implement usage limits** based on subscription plans
2. **Add subscription upgrade/downgrade** functionality
3. **Create billing analytics** dashboard
4. **Implement dunning management** for failed payments
5. **Add invoice generation** and email notifications

## Support

- **Stripe Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **Stripe Support**: Available in your Stripe Dashboard
- **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)

Your Stripe integration is now ready to process payments for the MagicWRX freemium platform! 