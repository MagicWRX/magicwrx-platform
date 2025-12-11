import Link from 'next/link'

export default function BlogToolPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Blog System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete blog management system with advanced features for content creators, 
            businesses, and publishers. Create, manage, and optimize your content with ease.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-8 card-shadow mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Blog System?</h2>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  SEO-optimized for better search rankings
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Advanced content management
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Built-in analytics and insights
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mobile-responsive design
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Pricing</h3>
              <div className="text-3xl font-bold mb-2">$199</div>
              <p className="text-blue-100 mb-4">one-time setup</p>
              <ul className="space-y-2 text-sm">
                <li>✓ Full blog system setup</li>
                <li>✓ Custom design integration</li>
                <li>✓ SEO optimization</li>
                <li>✓ Training & documentation</li>
                <li>✓ 30 days support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl mb-3">✍️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Rich Text Editor</h3>
              <p className="text-sm text-gray-600">Advanced WYSIWYG editor with formatting, media embedding, and real-time collaboration.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl mb-3">📂</div>
              <h3 className="font-semibold text-gray-900 mb-2">Category Management</h3>
              <p className="text-sm text-gray-600">Organize content with hierarchical categories and subcategories for better navigation.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl mb-3">🏷️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Tag System</h3>
              <p className="text-sm text-gray-600">Flexible tagging system for content organization and improved discoverability.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">Comment Moderation</h3>
              <p className="text-sm text-gray-600">Advanced comment system with spam protection, moderation tools, and user management.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2">SEO Optimization</h3>
              <p className="text-sm text-gray-600">Built-in SEO tools including meta tags, structured data, and performance optimization.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Social Sharing</h3>
              <p className="text-sm text-gray-600">Automatic social media integration with customizable sharing buttons and previews.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Analytics Integration</h3>
              <p className="text-sm text-gray-600">Built-in analytics with Google Analytics integration and detailed performance metrics.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-900 mb-2">Newsletter Integration</h3>
              <p className="text-sm text-gray-600">Email newsletter functionality with subscriber management and automated campaigns.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Content Protection</h3>
              <p className="text-sm text-gray-600">Password-protected posts, member-only content, and content licensing options.</p>
            </div>
          </div>
        </div>

        {/* Implementation Process */}
        <div className="bg-white rounded-2xl p-8 card-shadow mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Implementation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">Discovery</h3>
              <p className="text-sm text-gray-600">Understand your content needs and target audience</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">Design</h3>
              <p className="text-sm text-gray-600">Custom design that matches your brand and requirements</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">Development</h3>
              <p className="text-sm text-gray-600">Build and integrate the blog system with your website</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
              <h3 className="font-semibold text-gray-900 mb-2">Launch</h3>
              <p className="text-sm text-gray-600">Deploy, test, and provide training for your team</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 card-shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Blog?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get a custom blog system that grows with your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 