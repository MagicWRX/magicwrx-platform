import Link from 'next/link'

export default function SaaSTemplateDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/templates" className="text-blue-600 hover:text-blue-700">
              ← Back to Templates
            </Link>
            <div className="flex gap-4">
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Live Preview →
              </a>
              <Link
                href="/signup?template=saas"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Use This Template
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SaaS Platform Template</h1>
          <p className="text-xl text-gray-600 mb-6">
            Full-featured SaaS application with user management, billing, and analytics.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">Indigo/Purple Theme</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Pro Template</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">SaaS Category</span>
          </div>
        </div>

        {/* Template Screenshots */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Dashboard</h3>
            <div className="bg-gradient-to-br from-indigo-900 to-pink-900 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                SaaS Platform
              </h2>
              <p className="text-gray-300 mb-6">
                Complete software platform with user management and subscription billing.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features Section</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
                <span className="text-2xl mr-4">👥</span>
                <div>
                  <h4 className="font-semibold text-gray-900">User Management</h4>
                  <p className="text-sm text-gray-600">Complete user authentication and role management</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
                <span className="text-2xl mr-4">💳</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Subscription Billing</h4>
                  <p className="text-sm text-gray-600">Automated recurring payments and invoicing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 card-shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Launch Your SaaS?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Click Live Preview to see it in action, or Use This Template to get started.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Live Preview →
            </a>
            <Link
              href="/signup?template=saas"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Use This Template
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
