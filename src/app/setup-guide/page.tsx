export default function SetupGuidePage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Firebase Setup Guide
          </h1>
          <p className="text-xl text-gray-600">
            Complete Firebase configuration for Magic WRX authentication
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 card-shadow mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🔧 Step-by-Step Setup
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Step 1: Firebase Console
              </h3>
              <p className="text-gray-600 mb-2">
                Go to <a href="https://console.firebase.google.com" target="_blank" className="text-blue-600 hover:underline">Firebase Console</a>
              </p>
              <p className="text-gray-600">
                Your project is already configured: <code className="bg-gray-100 px-2 py-1 rounded">magic-wrx</code>
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Step 2: Enable Authentication
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Go to Authentication → Sign-in method</li>
                <li>• Enable <strong>Email/Password</strong></li>
                <li>• Enable <strong>Google</strong> provider</li>
                <li>• Add authorized domains: <code className="bg-gray-100 px-2 py-1 rounded">localhost</code></li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Step 3: Enable Firestore Database
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Go to Firestore Database</li>
                <li>• Click &quot;Create database&quot;</li>
                <li>• Choose &quot;Start in test mode&quot;</li>
                <li>• Select your preferred location</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Step 4: Configure Domain (Production)
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Go to Authentication → Settings</li>
                <li>• Add your production domain to &quot;Authorized domains&quot;</li>
                <li>• Example: <code className="bg-gray-100 px-2 py-1 rounded">yourdomain.com</code></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 card-shadow mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🚨 Troubleshooting Common Issues
          </h2>

          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">
                Error: &quot;popup-closed-by-user&quot;
              </h3>
              <p className="text-red-700 text-sm">
                <strong>Solution:</strong> Make sure popups are allowed in your browser and try the Google sign-in again.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">
                Error: &quot;400 Bad Request&quot;
              </h3>
              <p className="text-orange-700 text-sm">
                <strong>Solution:</strong> Ensure Authentication and Firestore are enabled in Firebase Console.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                Error: &quot;auth/unauthorized-domain&quot;
              </h3>
              <p className="text-blue-700 text-sm">
                <strong>Solution:</strong> Add your domain (localhost for development) to authorized domains in Firebase Auth settings.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🎯 Your Firebase Configuration
          </h2>
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800">
{`const firebaseConfig = {
  apiKey: "AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4",
  authDomain: "magic-wrx.firebaseapp.com",
  projectId: "magic-wrx",
  storageBucket: "magic-wrx.firebasestorage.app",
  messagingSenderId: "24629615626",
  appId: "1:24629615626:web:f9d4d0fac5f709b996d3f3",
  measurementId: "G-RJEJT2JT5T"
};`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            ✅ This configuration is already set up in <code>src/lib/firebase.ts</code>
          </p>
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/demo-login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Try Demo Mode
            </a>
            <a
              href="/login"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
