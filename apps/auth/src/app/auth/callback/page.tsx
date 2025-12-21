'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect_to') || '/'

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        // Redirect back with error
        window.location.href = `${redirectTo}?error=auth_failed`
        return
      }

      // Redirect back to customer site with token
      window.location.href = `${redirectTo}?token=${data.session.access_token}`
    }

    handleCallback()
  }, [redirectTo])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Completing authentication...</p>
      </div>
    </div>
  )
}