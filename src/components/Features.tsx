export default function Features() {
  const features = [
    {
      name: 'Mobile-First Design',
      description: 'All templates are built with mobile-first approach, ensuring perfect responsive design.',
      icon: '📱',
    },
    {
      name: 'Flutter Integration',
      description: 'Seamlessly integrate with Flutter applications for native mobile experiences.',
      icon: '🚀',
    },
    {
      name: 'Firebase Backend',
      description: 'Built-in Firebase integration for authentication, database, and hosting.',
      icon: '🔥',
    },
    {
      name: 'Premium Templates',
      description: 'Choose from 5 carefully crafted templates for different business needs.',
      icon: '🎨',
    },
    {
      name: 'Admin Dashboard',
      description: 'Comprehensive admin panel for managing users, content, and analytics.',
      icon: '📊',
    },
    {
      name: '24/7 Support',
      description: 'Get help when you need it with our dedicated support team.',
      icon: '💬',
    },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and templates you need to build 
            professional web and mobile applications.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative bg-white p-8 rounded-2xl card-shadow hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
