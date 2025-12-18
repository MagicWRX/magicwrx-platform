'use client'

import Link from 'next/link'
import SupabaseStatus from '@/components/SupabaseStatus'

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Supabase Troubleshooting</h1>
          <p className="mt-2 text-gray-600">
            Resolve common Supabase authentication and connection issues
          </p>
        </div>

        {/* Supabase Status */}
        <div className="mb-8">
          <SupabaseStatus />
        </div>

        {/* Common Errors */}
        <div className="space-y-8">
          {/* Popup Closed Error */}
          <div className="bg-white rounded-lg p-6 card-shadow">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              🚫 Error: OAuth Popup Closed
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>What it means:</strong> The Google sign-in popup was closed before completing authentication.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Make sure to complete the sign-in process in the popup window</li>
                <li>Don&apos;t close the popup before selecting your Google account</li>
                <li>Check if popup blockers are preventing the window from opening</li>
                <li>Try disabling browser extensions that might interfere</li>
              </ul>
            </div>
          </div>

          {/* Configuration Error */}
          <div className="bg-white rounded-lg p-6 card-shadow">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              ⚠️ Error: Configuration Missing
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>What it means:</strong> Supabase URL or Anon Key is missing from environment variables.</p>
              <p><strong>Common causes:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Missing .env.local file</li>
                <li>Incorrect variable names (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)</li>
                <li>Environment variables not added to Vercel project settings</li>
              </ul>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Verify your .env.local file exists and contains the correct keys</li>
                <li>Check Vercel project settings for environment variables</li>
                <li>Restart the development server after changing environment variables</li>
              </ul>
            </div>
          </div>

          {/* Network Errors */}
          <div className="bg-white rounded-lg p-6 card-shadow">
            <h2 className="text-xl font-semibold text-orange-600 mb-4">
              🌐 Network Connection Issues
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>If Supabase services are unreachable:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Check your internet connection</li>
                <li>Verify your firewall isn&apos;t blocking Supabase domains</li>
                <li>Try refreshing the page</li>
              </ul>
            </div>
          </div>

          {/* Setup Steps */}
          <div className="bg-white rounded-lg p-6 card-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              🔧 Supabase Setup Checklist
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Ensure these steps are completed:</strong></p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  <strong>Supabase Project Setup:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Create project at <a href="https://supabase.com/dashboard" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Supabase Dashboard</a></li>
                    <li>Enable Google Auth Provider in Authentication settings</li>
                  </ul>
                </li>
                <li>
                  <strong>URL Configuration:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Add your site URL to Redirect URLs in Supabase Auth settings</li>
                    <li>For local development: http://localhost:3000/auth/callback</li>
                    <li>For production: https://your-domain.com/auth/callback</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Logging In Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
