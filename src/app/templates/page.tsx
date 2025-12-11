import Link from 'next/link'

export default function TemplatesPage() {
  const templates = [
    {
      id: 'portfolio',
      name: 'Creative Portfolio',
      description: 'Showcase your creative work, build your brand, and attract clients with a stunning portfolio website.',
      image: '/templates/portfolio.svg',
      category: 'Portfolio',
      theme: 'Purple/Creative',
      features: ['Visual Showcase', 'Client Ready', 'Fast & Responsive', 'SEO Optimized'],
      demoUrl: '/templates/portfolio',
      gradient: 'from-purple-900 via-blue-900 to-indigo-900',
      icon: '🎨',
      price: 'Free',
      businessType: 'Creative professionals, designers, artists',
    },
    {
      id: 'ecommerce',
      name: 'Online Store',
      description: 'Complete e-commerce solution with shopping cart, payment processing, and inventory management.',
      image: '/templates/ecommerce.svg',
      category: 'E-commerce',
      theme: 'Green/Commerce',
      features: ['Shopping Cart', 'Payment Gateway', 'Inventory Management', 'Customer Dashboard'],
      demoUrl: '/templates/ecommerce',
      gradient: 'from-green-900 to-teal-900',
      icon: '🛒',
      price: 'Pro',
      businessType: 'Online stores, retail businesses',
    },
    {
      id: 'service',
      name: 'Professional Services',
      description: 'Complete service business website with booking systems and client management.',
      image: '/templates/service.svg',
      category: 'Services',
      theme: 'Blue/Professional',
      features: ['Online Booking', 'Client Portals', 'Consultation Scheduling', 'Service Showcase'],
      demoUrl: '/templates/service',
      gradient: 'from-blue-900 to-purple-900',
      icon: '💼',
      price: 'Basic',
      businessType: 'Professional services, consultants, agencies',
    },
    {
      id: 'restaurant',
      name: 'Restaurant & Cafe',
      description: 'Digital menu and ordering system for restaurants and food services.',
      image: '/templates/restaurant.svg',
      category: 'Food & Beverage',
      theme: 'Red/Orange',
      features: ['Online Ordering', 'Menu Management', 'Table Reservations', 'Loyalty Program'],
      demoUrl: '/templates/restaurant',
      gradient: 'from-red-900 to-yellow-900',
      icon: '🍽️',
      price: 'Basic',
      businessType: 'Restaurants, cafes, food businesses',
    },
    {
      id: 'saas',
      name: 'SaaS Platform',
      description: 'Full-featured SaaS application with user management, billing, and analytics.',
      image: '/templates/saas.svg',
      category: 'SaaS',
      theme: 'Indigo/Purple',
      features: ['User Management', 'Subscription Billing', 'Analytics Dashboard', 'API Integration'],
      demoUrl: '/templates/saas',
      gradient: 'from-indigo-900 to-pink-900',
      icon: '💻',
      price: 'Pro',
      businessType: 'Software companies, tech startups',
    },
    {
      id: 'corporate',
      name: 'Corporate Website',
      description: 'Professional corporate website with team pages, services, and investor relations.',
      image: '/templates/corporate.svg',
      category: 'Corporate',
      theme: 'Gray/Professional',
      features: ['Team Showcase', 'Service Pages', 'Investor Relations', 'Global Presence'],
      demoUrl: '/templates/corporate',
      gradient: 'from-gray-900 to-zinc-900',
      icon: '🏢',
      price: 'Enterprise',
      businessType: 'Large corporations, enterprises',
    },
  ]

  const categories = ['All', 'Portfolio', 'E-commerce', 'Services', 'Food & Beverage', 'SaaS', 'Corporate']

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Professional Templates
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose from our collection of business-focused templates designed for success
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl overflow-hidden card-shadow hover:shadow-xl transition-shadow duration-300"
            >
              {/* Template Preview */}
              <div className={`h-48 bg-gradient-to-br ${template.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <span className="text-white text-6xl relative z-10">{template.icon}</span>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    template.price === 'Free' 
                      ? 'bg-green-100 text-green-800' 
                      : template.price === 'Basic'
                      ? 'bg-blue-100 text-blue-800'
                      : template.price === 'Pro'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {template.price}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {template.category}
                  </span>
                  <span className="text-sm text-gray-500">{template.theme}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {template.name}
                </h3>

                <p className="text-gray-600 mb-3">
                  {template.description}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  <strong>Perfect for:</strong> {template.businessType}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={template.demoUrl}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Demo
                  </Link>
                  <Link
                    href={`/signup?template=${template.id}`}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Template Categories Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Free Templates</h3>
            <p className="text-gray-600 mb-4">Start with our free portfolio template. Perfect for creatives and professionals getting started.</p>
            <div className="text-sm text-gray-500">
              <p>• Portfolio template included</p>
              <p>• Basic customization</p>
              <p>• Community support</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Premium Templates</h3>
            <p className="text-gray-600 mb-4">Access all templates with Basic plan and above. Advanced features and customization options.</p>
            <div className="text-sm text-gray-500">
              <p>• All 6 business templates</p>
              <p>• Advanced customization</p>
              <p>• Priority support</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Custom Templates</h3>
            <p className="text-gray-600 mb-4">Need something specific? Our team can create custom templates tailored to your business needs.</p>
            <div className="text-sm text-gray-500">
              <p>• Custom design & development</p>
              <p>• Brand-specific features</p>
              <p>• Dedicated support</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 card-shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Build Your Website?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose a template and start building your professional website today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View Pricing Plans
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
