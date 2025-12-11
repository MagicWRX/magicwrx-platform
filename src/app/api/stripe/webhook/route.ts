import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/firebase'
import { doc, updateDoc, setDoc } from 'firebase/firestore'

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
  const customerEmail = session.customer_details?.email
  const plan = session.metadata?.plan

  if (customerEmail && plan && db) {
    // Update user subscription in Firestore
    const userRef = doc(db, 'users', customerEmail)
    await updateDoc(userRef, {
      subscription: {
        plan,
        status: 'active',
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
        createdAt: new Date(),
      },
    })
  }
}

async function handleSubscriptionCreated(subscription: any) {
  const customerEmail = subscription.metadata?.email
  const plan = subscription.metadata?.plan

  if (customerEmail && plan && db) {
    const userRef = doc(db, 'users', customerEmail)
    await updateDoc(userRef, {
      subscription: {
        plan,
        status: subscription.status,
        stripeCustomerId: subscription.customer,
        stripeSubscriptionId: subscription.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        createdAt: new Date(),
      },
    })
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  const customerEmail = subscription.metadata?.email

  if (customerEmail && db) {
    const userRef = doc(db, 'users', customerEmail)
    await updateDoc(userRef, {
      'subscription.status': subscription.status,
      'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
    })
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  const customerEmail = subscription.metadata?.email

  if (customerEmail && db) {
    const userRef = doc(db, 'users', customerEmail)
    await updateDoc(userRef, {
      'subscription.status': 'canceled',
      'subscription.canceledAt': new Date(),
    })
  }
}

async function handlePaymentSucceeded(invoice: any) {
  const customerEmail = invoice.customer_email

  if (customerEmail && db) {
    const userRef = doc(db, 'users', customerEmail)
    await updateDoc(userRef, {
      'subscription.lastPaymentDate': new Date(),
      'subscription.status': 'active',
    })
  }
}

async function handlePaymentFailed(invoice: any) {
  const customerEmail = invoice.customer_email

  if (customerEmail && db) {
    const userRef = doc(db, 'users', customerEmail)
    await updateDoc(userRef, {
      'subscription.status': 'past_due',
      'subscription.lastPaymentAttempt': new Date(),
    })
  }
} 