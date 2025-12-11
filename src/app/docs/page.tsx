export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Documentation</h1>
          <p className="mt-4 text-xl text-gray-600">Complete guides and API reference for Magic WRX.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 card-shadow sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h3>
              <nav className="space-y-2">
                <a href="#quick-start" className="block text-blue-600 hover:text-blue-800 py-1">Quick Start</a>
                <a href="#templates" className="block text-gray-600 hover:text-blue-600 py-1">Templates</a>
                <a href="#site-builder" className="block text-gray-600 hover:text-blue-600 py-1">Site Builder</a>
                <a href="#api" className="block text-gray-600 hover:text-blue-600 py-1">API Reference</a>
                <a href="#deployment" className="block text-gray-600 hover:text-blue-600 py-1">Deployment</a>
                <a href="#integrations" className="block text-gray-600 hover:text-blue-600 py-1">Integrations</a>
                <a href="#examples" className="block text-gray-600 hover:text-blue-600 py-1">Examples</a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-8 card-shadow">
              
              {/* Quick Start Section */}
              <section id="quick-start" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Start</h2>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-600 mb-6">
                    Get up and running with Magic WRX in just a few steps.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Create an Account</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <code className="text-sm">
                      Visit <span className="text-blue-600">magicwrx.com/signup</span> and create your account
                    </code>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Choose a Template</h3>
                  <p className="text-gray-600 mb-4">Select from our collection of professional templates:</p>
                  <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
                    <li>E-commerce Store - Complete online shopping platform</li>
                    <li>SaaS Platform - Software as a Service application</li>
                    <li>Portfolio Website - Creative professional showcase</li>
                    <li>Restaurant Menu - Digital menu and ordering system</li>
                    <li>Corporate Website - Professional business site</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Customize Your Site</h3>
                  <p className="text-gray-600 mb-6">
                    Use our drag-and-drop builder to customize your site. Add components, edit content, and style elements to match your brand.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Publish</h3>
                  <p className="text-gray-600 mb-6">
                    When you&apos;re ready, click publish to make your site live. Your site will be available instantly on our global CDN.
                  </p>
                </div>
              </section>

              {/* Templates Section */}
              <section id="templates" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">E-commerce Store</h4>
                    <p className="text-sm text-gray-600">Complete online shopping platform with product catalog, shopping cart, and checkout.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">SaaS Platform</h4>
                    <p className="text-sm text-gray-600">Software as a Service application with landing page, pricing, and user dashboard.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Portfolio Website</h4>
                    <p className="text-sm text-gray-600">Creative professional showcase with gallery, about section, and contact form.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Restaurant Menu</h4>
                    <p className="text-sm text-gray-600">Digital menu and ordering system with categories, items, and online ordering.</p>
                  </div>
                </div>
              </section>

              {/* Site Builder Section */}
              <section id="site-builder" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Site Builder</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Components</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded">Header</div>
                      <div className="bg-gray-50 p-3 rounded">Hero Section</div>
                      <div className="bg-gray-50 p-3 rounded">Text Block</div>
                      <div className="bg-gray-50 p-3 rounded">Image</div>
                      <div className="bg-gray-50 p-3 rounded">Gallery</div>
                      <div className="bg-gray-50 p-3 rounded">Contact Form</div>
                      <div className="bg-gray-50 p-3 rounded">Button</div>
                      <div className="bg-gray-50 p-3 rounded">Footer</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Customization Options</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Drag and drop components to reorder</li>
                      <li>Edit text content inline</li>
                      <li>Upload and replace images</li>
                      <li>Customize colors and fonts</li>
                      <li>Adjust spacing and layout</li>
                      <li>Add custom CSS (Pro plans)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* API Section */}
              <section id="api" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">API Reference</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <code className="text-sm">
                        POST /api/auth/login<br/>
                        POST /api/auth/logout<br/>
                        POST /api/auth/register
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Sites</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <code className="text-sm">
                        GET /api/sites - List all sites<br/>
                        POST /api/sites - Create new site<br/>
                        GET /api/sites/:id - Get site details<br/>
                        PUT /api/sites/:id - Update site<br/>
                        DELETE /api/sites/:id - Delete site
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Templates</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <code className="text-sm">
                        GET /api/templates - List available templates<br/>
                        GET /api/templates/:id - Get template details
                      </code>
                    </div>
                  </div>
                </div>
              </section>

              {/* Deployment Section */}
              <section id="deployment" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Deployment</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Magic WRX automatically deploys your sites to our global CDN for fast loading times worldwide.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Domains</h3>
                  <p className="text-gray-600 mb-4">
                    Connect your own domain (Pro plans and above):
                  </p>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>Go to your site settings</li>
                    <li>Add your custom domain</li>
                    <li>Update your DNS records</li>
                    <li>Wait for SSL certificate generation</li>
                  </ol>
                </div>
              </section>

              {/* Examples Section */}
              <section id="examples" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Portfolio Site</h4>
                    <p className="text-sm text-gray-600 mb-3">A complete portfolio site for a designer.</p>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">View Example →</a>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Restaurant Website</h4>
                    <p className="text-sm text-gray-600 mb-3">A restaurant site with menu and online ordering.</p>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">View Example →</a>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">SaaS Landing Page</h4>
                    <p className="text-sm text-gray-600 mb-3">A conversion-optimized SaaS landing page.</p>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">View Example →</a>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">E-commerce Store</h4>
                    <p className="text-sm text-gray-600 mb-3">A full-featured online store with checkout.</p>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">View Example →</a>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
