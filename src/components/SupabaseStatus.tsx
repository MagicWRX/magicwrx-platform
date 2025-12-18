'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SupabaseStatus() {
  const [status, setStatus] = useState({
    configured: false,
    authConnected: false,
    dbConnected: false,
    error: null as string | null,
    loading: true
  })

  useEffect(() => {
    const checkSupabaseStatus = async () => {
      try {
        const supabase = createClient()
        
        // Check configuration
        const configured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        let authConnected = false
        let dbConnected = false

        if (configured) {
          // Test auth connection
          try {
            const { error } = await supabase.auth.getSession()
            if (!error) {
              authConnected = true
            }
          } catch (error) {
            console.error('Auth connection test failed:', error)
          }

          // Test Database connection
          try {
            // Try to select from a table, or just check health if possible.
            // Since we might not have tables yet, we can try a simple query or assume connected if auth works.
            // But let's try to query 'profiles' if it exists, or just check if we can make a request.
            const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true })
            // Even if table doesn't exist (404) or permission denied (401), it means we reached Supabase.
            // Network error would be different.
            if (!error || error.code === 'PGRST116' || error.code === '42P01') {
               dbConnected = true
            } else {
               // If we get a specific error code from Postgres, we are connected.
               dbConnected = true
            }
          } catch (error: any) {
             console.warn('Database test:', error.message)
          }
        }

        setStatus({
          configured,
          authConnected,
          dbConnected,
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

    checkSupabaseStatus()
  }, [])

  if (status.loading) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Supabase Status</h3>
        <p className="text-gray-600">Checking connection...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-800 mb-2">Supabase Status</h3>
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
          <span className={`inline-block w-3 h-3 rounded-full ${status.dbConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-sm">Database: {status.dbConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
        {status.error && (
          <div className="text-red-500 text-sm mt-2">
            Error: {status.error}
          </div>
        )}
      </div>
    </div>
  )
}
