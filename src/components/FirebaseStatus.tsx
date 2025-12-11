'use client'

import { useState, useEffect } from 'react'
import { auth, db, isFirebaseConfigured } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export default function FirebaseStatus() {
  const [status, setStatus] = useState({
    configured: false,
    authConnected: false,
    firestoreConnected: false,
    authUser: null as any,
    error: null as string | null,
    loading: true
  })

  useEffect(() => {
    const checkFirebaseStatus = async () => {
      try {
        // Check configuration
        const configured = !!isFirebaseConfigured()
        
        let authConnected = false
        let firestoreConnected = false
        let authUser = null

        if (configured && auth) {
          // Test auth connection
          try {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
              authUser = user
              authConnected = true
              unsubscribe()
            })
          } catch (error) {
            console.error('Auth connection test failed:', error)
          }

          // Test Firestore connection
          if (db) {
            try {
              // Try to read a document (this will fail gracefully if no permission)
              await getDoc(doc(db, 'test', 'connection'))
              firestoreConnected = true
            } catch (error: any) {
              // Connection successful even if permission denied
              if (error.code === 'permission-denied' || error.code === 'not-found') {
                firestoreConnected = true
              }
              console.warn('Firestore test:', error.message)
            }
          }
        }

        setStatus({
          configured,
          authConnected,
          firestoreConnected,
          authUser,
          error: null,
          loading: false
        })
      } catch (error: any) {
        setStatus(prev => ({
          ...prev,
          error: error.message,
          loading: false
        }))
      }
    }

    checkFirebaseStatus()
  }, [])

  if (status.loading) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Firebase Status</h3>
        <p className="text-gray-600">Checking connection...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-800 mb-2">Firebase Status</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className={`inline-block w-3 h-3 rounded-full ${status.configured ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-sm">Configuration: {status.configured ? 'Valid' : 'Invalid'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-block w-3 h-3 rounded-full ${status.authConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-sm">Authentication: {status.authConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-block w-3 h-3 rounded-full ${status.firestoreConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-sm">Firestore: {status.firestoreConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
        {status.authUser && (
          <div className="text-sm text-gray-600">
            Signed in as: {status.authUser.email}
          </div>
        )}
        {status.error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            Error: {status.error}
          </div>
        )}
      </div>
    </div>
  )
}
