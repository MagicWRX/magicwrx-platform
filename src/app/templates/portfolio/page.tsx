import Link from 'next/link'

export default function PortfolioTemplateDemo() {
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
              <Link
                href="/signup?template=portfolio"
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Creative Portfolio Template</h1>
          <p className="text-xl text-gray-600 mb-6">
            Showcase your creative work, build your brand, and attract clients with a stunning portfolio website.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Purple/Creative Theme</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Free Template</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Portfolio Category</span>
          </div>
        </div>

        {/* Template Screenshots */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h3>
            <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Creative
                <span className="block text-purple-300">Portfolio</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Showcase your creative work, build your brand, and attract clients with a stunning portfolio website.
              </p>
              <div className="flex gap-4 justify-center">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  View Work
                </button>
                <button className="border border-purple-300 text-purple-300 px-6 py-2 rounded-lg hover:bg-purple-300 hover:text-purple-900 transition-colors">
                  Contact
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features Section</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <span className="text-2xl mr-4">🎨</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Visual Showcase</h4>
                  <p className="text-sm text-gray-600">Beautiful galleries and layouts optimized for visual content</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <span className="text-2xl mr-4">💼</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Client Ready</h4>
                  <p className="text-sm text-gray-600">Professional presentation to attract and impress clients</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <span className="text-2xl mr-4">🚀</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Fast & Responsive</h4>
                  <p className="text-sm text-gray-600">Optimized for all devices with lightning-fast loading</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Template Features */}
        <div className="bg-white rounded-2xl p-8 card-shadow mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Template Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Design & Layout</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Purple/Creative gradient theme</li>
                <li>• Responsive design for all devices</li>
                <li>• Modern, clean typography</li>
                <li>• Optimized for visual content</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Portfolio Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Project showcase galleries</li>
                <li>• Client testimonials section</li>
                <li>• About/contact pages</li>
                <li>• SEO optimized structure</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Technical Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Next.js 15 with TypeScript</li>
                <li>• Firebase integration ready</li>
                <li>• Fast loading performance</li>
                <li>• Mobile-first responsive</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Perfect For Section */}
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-6">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <span className="text-4xl mb-4 block">🎨</span>
              <h3 className="font-semibold mb-2">Designers</h3>
              <p className="text-purple-200 text-sm">Showcase your design work and creative process</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">📸</span>
              <h3 className="font-semibold mb-2">Photographers</h3>
              <p className="text-purple-200 text-sm">Display your photography portfolio beautifully</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">💻</span>
              <h3 className="font-semibold mb-2">Developers</h3>
              <p className="text-purple-200 text-sm">Showcase your coding projects and skills</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 card-shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Showcase Your Work?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start building your professional portfolio website today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup?template=portfolio"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Use This Template
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 