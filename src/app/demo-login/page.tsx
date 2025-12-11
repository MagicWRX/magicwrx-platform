'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DemoLoginPage() {
  const [loading, setLoading] = useState(false)

  const handleDemoLogin = () => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => {
      // Redirect to admin with demo mode
      window.location.href = '/admin?demo=true'
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Demo Mode - Magic WRX
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Firebase not configured yet?{' '}
            <Link href="/setup-guide" className="font-medium text-blue-600 hover:text-blue-500">
              View setup guide
            </Link>
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Demo Mode Available
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Try the admin dashboard without Firebase setup. This is for demonstration purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Entering Demo...
              </div>
            ) : (
              'Enter Demo Mode'
            )}
          </button>

          <div className="text-center">
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              ← Back to Firebase Login
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            🔧 Firebase Setup Required
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. Go to <a href="https://console.firebase.google.com" target="_blank" className="text-blue-600 hover:underline">Firebase Console</a></p>
            <p>2. Enable Authentication (Email/Password + Google)</p>
            <p>3. Enable Firestore Database</p>
            <p>4. Add your domain to authorized origins</p>
          </div>
        </div>
      </div>
    </div>
  )
}
