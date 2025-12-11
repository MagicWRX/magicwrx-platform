'use client'

import { useState, useEffect } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth, handleFirebaseError, isFirebaseConfigured } from '@/lib/firebase'

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    // Check if Firebase is properly configured
    const configured = !!isFirebaseConfigured()
    setIsConfigured(configured)

    if (!configured) {
      setError('Firebase is not properly configured. Please check your setup.')
      setLoading(false)
      return
    }

    if (!auth) {
      setError('Firebase Auth is not initialized.')
      setLoading(false)
      return
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user)
        setLoading(false)
        setError(null)
      }, (error) => {
        console.error('Auth state change error:', error)
        setError(handleFirebaseError(error))
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (error: any) {
      console.error('Auth initialization error:', error)
      setError(handleFirebaseError(error))
      setLoading(false)
    }
  }, [])

  return { user, loading, error, isConfigured }
}
