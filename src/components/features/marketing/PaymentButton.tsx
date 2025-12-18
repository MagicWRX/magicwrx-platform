'use client'

import { useState } from 'react'
import { getStripe } from '@/lib/stripe'
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth'
import { Button } from '@/components/ui/button'

interface PaymentButtonProps {
  priceId: string
  planName: string
  className?: string
  children: React.ReactNode
}

export default function PaymentButton({ 
  priceId, 
  planName, 
  className = '', 
  children 
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const { user } = useSupabaseAuth()

  const handleCheckout = async () => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          customerEmail: user.email,
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        console.error('Checkout error:', error)
        alert('Failed to start checkout. Please try again.')
        return
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          console.error('Stripe redirect error:', error)
          alert('Failed to redirect to checkout. Please try again.')
        }
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? 'Processing...' : children}
    </Button>
  )
}
 