import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase Admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseAdmin = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : null

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event

  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 500 }
    )
  }

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  if (!supabaseAdmin) {
     console.error('Supabase Admin not configured')
     return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object)
        break
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object)
        break
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object)
        break
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object)
        break
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  const userId = session.metadata?.userId
  const plan = session.metadata?.plan

  if (userId && plan && supabaseAdmin) {
    await supabaseAdmin
      .from('users')
      .update({ plan: plan })
      .eq('id', userId)
  }
}

async function handleSubscriptionCreated(subscription: any) {
  const userId = subscription.metadata?.userId
  const plan = subscription.metadata?.plan

  if (userId && plan && supabaseAdmin) {
    await supabaseAdmin
      .from('users')
      .update({ plan: plan })
      .eq('id', userId)
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  const userId = subscription.metadata?.userId
  // Logic to update status if we tracked it in public.users
  // Currently only 'plan' is in schema.
}

async function handleSubscriptionDeleted(subscription: any) {
  const userId = subscription.metadata?.userId
  if (userId && supabaseAdmin) {
    await supabaseAdmin
      .from('users')
      .update({ plan: 'free' })
      .eq('id', userId)
  }
}

async function handlePaymentSucceeded(invoice: any) {
  // No action needed for now unless we track payment history
}

async function handlePaymentFailed(invoice: any) {
  // Could notify user or downgrade
}
