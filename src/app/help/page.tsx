export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Help Center</h1>
          <p className="mt-4 text-xl text-gray-600">Find answers to your questions and get support.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Getting Started */}
          <div className="bg-white rounded-2xl p-8 card-shadow">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h3>
            <p className="text-gray-600 mb-6">Learn how to create your first website with Magic WRX.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Creating your account</li>
              <li>• Choosing a template</li>
              <li>• Customizing your site</li>
              <li>• Publishing your website</li>
            </ul>
          </div>

          {/* Templates */}
          <div className="bg-white rounded-2xl p-8 card-shadow">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Templates</h3>
            <p className="text-gray-600 mb-6">Explore our collection of professional templates.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• E-commerce stores</li>
              <li>• SaaS platforms</li>
              <li>• Portfolio websites</li>
              <li>• Restaurant sites</li>
              <li>• Corporate websites</li>
            </ul>
          </div>

          {/* Site Builder */}
          <div className="bg-white rounded-2xl p-8 card-shadow">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white text-2xl">🛠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Site Builder</h3>
            <p className="text-gray-600 mb-6">Master the drag-and-drop site builder.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Adding components</li>
              <li>• Editing content</li>
              <li>• Styling elements</li>
              <li>• Preview mode</li>
              <li>• Publishing changes</li>
            </ul>
          </div>

          {/* Account & Billing */}
          <div className="bg-white rounded-2xl p-8 card-shadow">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white text-2xl">💳</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Account & Billing</h3>
            <p className="text-gray-600 mb-6">Manage your account and subscription.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Subscription plans</li>
              <li>• Payment methods</li>
              <li>• Account settings</li>
              <li>• Usage limits</li>
              <li>• Cancellation</li>
            </ul>
          </div>

          {/* Troubleshooting */}
          <div className="bg-white rounded-2xl p-8 card-shadow">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white text-2xl">🔧</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Troubleshooting</h3>
            <p className="text-gray-600 mb-6">Common issues and solutions.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Login problems</li>
              <li>• Site not loading</li>
              <li>• Publishing errors</li>
              <li>• Performance issues</li>
              <li>• Mobile display</li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-2xl p-8 card-shadow">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white text-2xl">📧</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Support</h3>
            <p className="text-gray-600 mb-6">Get personalized help from our team.</p>
            <div className="space-y-4">
              <a 
                href="/contact" 
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              >
                Contact Us
              </a>
              <div className="text-sm text-gray-600">
                <p>Email: support@magicwrx.com</p>
                <p>Response time: 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-lg p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I get started with Magic WRX?</h3>
              <p className="text-gray-600">Simply sign up for an account, choose a template that fits your needs, and start customizing using our drag-and-drop builder. You can publish your site in minutes!</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use my own domain?</h3>
              <p className="text-gray-600">Yes! Pro and Enterprise plans include custom domain support. You can connect your existing domain or purchase a new one through our platform.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free plan available?</h3>
              <p className="text-gray-600">Yes, we offer a free tier that includes basic templates and hosting with Magic WRX branding. Upgrade to remove branding and unlock premium features.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I contact support?</h3>
              <p className="text-gray-600">You can reach our support team through the contact form, email us at support@magicwrx.com, or access live chat from your dashboard (Pro+ plans).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
