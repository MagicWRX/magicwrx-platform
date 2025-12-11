'use client'

import Link from 'next/link'
import FirebaseStatus from '@/components/FirebaseStatus'

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Firebase Troubleshooting</h1>
          <p className="mt-2 text-gray-600">
            Resolve common Firebase authentication and connection issues
          </p>
        </div>

        {/* Firebase Status */}
        <div className="mb-8">
          <FirebaseStatus />
        </div>

        {/* Common Errors */}
        <div className="space-y-8">
          {/* Popup Closed Error */}
          <div className="bg-white rounded-lg p-6 card-shadow">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              🚫 Error: auth/popup-closed-by-user
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

          {/* 400 Status Error */}
          <div className="bg-white rounded-lg p-6 card-shadow">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              ⚠️ Error: 400 Status Response
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>What it means:</strong> Bad request to Firebase servers, usually due to configuration issues.</p>
              <p><strong>Common causes:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Invalid Firebase project configuration</li>
                <li>Incorrect API keys or project settings</li>
                <li>Domain not authorized in Firebase console</li>
                <li>Authentication methods not enabled</li>
              </ul>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Verify your Firebase project settings in the Firebase Console</li>
                <li>Add your domain to authorized domains: Firebase Console → Authentication → Settings → Authorized domains</li>
                <li>Enable email/password and Google authentication methods</li>
                <li>Check that your API key is valid and hasn&apos;t been restricted</li>
              </ul>
            </div>
          </div>

          {/* Network Errors */}
          <div className="bg-white rounded-lg p-6 card-shadow">
            <h2 className="text-xl font-semibold text-orange-600 mb-4">
              🌐 Network Connection Issues
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>If Firebase services are unreachable:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Check your internet connection</li>
                <li>Verify your firewall isn&apos;t blocking Firebase domains</li>
                <li>Try refreshing the page</li>
                <li>Check if your network blocks googleapis.com or firebase.com</li>
              </ul>
            </div>
          </div>

          {/* Setup Steps */}
          <div className="bg-white rounded-lg p-6 card-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              🔧 Firebase Setup Checklist
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Ensure these steps are completed:</strong></p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  <strong>Firebase Project Setup:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Create project at <a href="https://console.firebase.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
                    <li>Enable Authentication service</li>
                    <li>Enable Email/Password and Google sign-in methods</li>
                  </ul>
                </li>
                <li>
                  <strong>Domain Authorization:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Add localhost:3000 to authorized domains (for development)</li>
                    <li>Add your production domain when deploying</li>
                  </ul>
                </li>
                <li>
                  <strong>Configuration:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Copy your web app configuration from Firebase Console</li>
                    <li>Update src/lib/firebase.ts with your config</li>
                    <li>Ensure all required fields are filled correctly</li>
                  </ul>
                </li>
                <li>
                  <strong>Test Users:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Create test users in Firebase Console</li>
                    <li>Or allow user registration in your Authentication settings</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          {/* Browser Compatibility */}
          <div className="bg-white rounded-lg p-6 card-shadow">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
              🌐 Browser Compatibility
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>For best results:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Use a modern browser (Chrome, Firefox, Safari, Edge)</li>
                <li>Enable cookies and JavaScript</li>
                <li>Disable strict tracking protection for this site</li>
                <li>Allow popups from this domain</li>
                <li>Clear browser cache if experiencing issues</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo-login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
          >
            Try Demo Login
          </Link>
          <Link
            href="/setup-guide"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-center"
          >
            Setup Guide
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
