import Link from 'next/link'

export default function ToolsPage() {
  const tools = [
    {
      id: 'blog',
      name: 'Blog System',
      description: 'Complete blog management with categories, tags, comments, and SEO optimization.',
      icon: '📝',
      features: [
        'Rich text editor',
        'Category management',
        'Tag system',
        'Comment moderation',
        'SEO optimization',
        'Social sharing',
        'Analytics integration'
      ],
      price: '$199',
      category: 'Content Management'
    },
    {
      id: 'calendar',
      name: 'Calendar & Scheduling',
      description: 'Advanced calendar system with booking, appointments, and event management.',
      icon: '📅',
      features: [
        'Event scheduling',
        'Booking system',
        'Calendar sync',
        'Reminder notifications',
        'Availability management',
        'Time zone support',
        'Integration with Google/Outlook'
      ],
      price: '$149',
      category: 'Scheduling'
    },
    {
      id: 'invoicing',
      name: 'Invoicing & Billing',
      description: 'Professional invoicing system with payment processing and financial tracking.',
      icon: '💰',
      features: [
        'Invoice generation',
        'Payment processing',
        'Recurring billing',
        'Tax calculations',
        'Financial reporting',
        'Client management',
        'Stripe/PayPal integration'
      ],
      price: '$299',
      category: 'Business'
    },
    {
      id: 'authentication',
      name: 'Advanced Authentication',
      description: 'Enhanced security with multi-factor authentication and role-based access.',
      icon: '🔐',
      features: [
        'Multi-factor authentication',
        'Role-based access control',
        'SSO integration',
        'Password policies',
        'Session management',
        'Audit logging',
        'OAuth providers'
      ],
      price: '$179',
      category: 'Security'
    },
    {
      id: 'gallery',
      name: 'Media Gallery',
      description: 'Professional image and video gallery with advanced filtering and organization.',
      icon: '🖼️',
      features: [
        'Image optimization',
        'Video streaming',
        'Album organization',
        'Lightbox viewer',
        'Social sharing',
        'Watermarking',
        'CDN integration'
      ],
      price: '$129',
      category: 'Media'
    },
    {
      id: 'notifications',
      name: 'Notification System',
      description: 'Real-time notifications with email, SMS, and push notification support.',
      icon: '🔔',
      features: [
        'Real-time notifications',
        'Email notifications',
        'SMS integration',
        'Push notifications',
        'Notification preferences',
        'Delivery tracking',
        'Template system'
      ],
      price: '$99',
      category: 'Communication'
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      description: 'Comprehensive analytics with custom reports and data visualization.',
      icon: '📊',
      features: [
        'Custom dashboards',
        'Real-time metrics',
        'User behavior tracking',
        'Conversion analytics',
        'A/B testing',
        'Export capabilities',
        'API integration'
      ],
      price: '$249',
      category: 'Analytics'
    },
    {
      id: 'chat',
      name: 'Live Chat System',
      description: 'Real-time customer support with chat widgets and conversation management.',
      icon: '💬',
      features: [
        'Live chat widget',
        'Agent dashboard',
        'Chat history',
        'File sharing',
        'Chat routing',
        'Offline messaging',
        'Mobile app support'
      ],
      price: '$199',
      category: 'Communication'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Tools',
      description: 'Complete online store functionality with inventory and order management.',
      icon: '🛒',
      features: [
        'Product catalog',
        'Shopping cart',
        'Order management',
        'Inventory tracking',
        'Payment processing',
        'Shipping integration',
        'Customer reviews'
      ],
      price: '$399',
      category: 'Business'
    },
    {
      id: 'forms',
      name: 'Form Builder',
      description: 'Advanced form creation with validation, file uploads, and data collection.',
      icon: '📋',
      features: [
        'Drag-and-drop builder',
        'Custom validation',
        'File uploads',
        'Conditional logic',
        'Data export',
        'Spam protection',
        'Integration APIs'
      ],
      price: '$89',
      category: 'Data Collection'
    },
    {
      id: 'api',
      name: 'API Development',
      description: 'Custom API development with documentation and testing tools.',
      icon: '🔌',
      features: [
        'RESTful APIs',
        'GraphQL support',
        'API documentation',
        'Rate limiting',
        'Authentication',
        'Testing tools',
        'Monitoring'
      ],
      price: '$349',
      category: 'Development'
    },
    {
      id: 'cms',
      name: 'Content Management',
      description: 'Advanced CMS with workflow management and content versioning.',
      icon: '📄',
      features: [
        'Content editor',
        'Workflow management',
        'Version control',
        'Multi-language support',
        'SEO tools',
        'Media library',
        'Publishing workflow'
      ],
      price: '$279',
      category: 'Content Management'
    }
  ]

  const categories = ['All', 'Content Management', 'Scheduling', 'Business', 'Security', 'Media', 'Communication', 'Analytics', 'Data Collection', 'Development']

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Web Development Tools
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Professional tools and services to enhance your website functionality
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

        {/* Tools Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl overflow-hidden card-shadow hover:shadow-xl transition-shadow duration-300"
            >
              {/* Tool Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{tool.icon}</span>
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tool.name}
                </h3>

                <p className="text-gray-600 mb-4">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{tool.price}</span>
                  <span className="text-sm text-gray-500">one-time setup</span>
                </div>
              </div>

              {/* Features */}
              <div className="p-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Features:</h4>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/tools/${tool.id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 card-shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Custom Development?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We can create custom tools and integrations tailored to your specific needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Request Custom Quote
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold text-gray-900 mb-2">Performance Optimization</h3>
              <p className="text-sm text-gray-600">Speed up your website with advanced optimization techniques</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Security Hardening</h3>
              <p className="text-sm text-gray-600">Protect your website with advanced security measures</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile Optimization</h3>
              <p className="text-sm text-gray-600">Ensure your site works perfectly on all devices</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="font-semibold text-gray-900 mb-2">Maintenance & Support</h3>
              <p className="text-sm text-gray-600">Ongoing maintenance and technical support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 