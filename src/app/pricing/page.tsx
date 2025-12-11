import Link from 'next/link'
import PaymentButton from '@/components/PaymentButton'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        '1 site',
        'Basic templates',
        'Subdomain hosting',
        'Ads displayed',
        'Firebase branding',
        '500MB storage',
        'Community support',
      ],
      popular: false,
      cta: 'Start Free',
      href: '/signup',
      priceId: null,
    },
    {
      name: 'Basic',
      price: '$19.99',
      description: 'Best for growing businesses',
      features: [
        '5 sites',
        'Premium templates',
        'Custom domain',
        'No ads',
        'Basic analytics',
        '2GB storage',
        'Email support',
      ],
      popular: true,
      cta: 'Start Free Trial',
      href: '/signup?plan=basic',
      priceId: 'price_basic_monthly', // Replace with your actual Stripe price ID
    },
    {
      name: 'Pro',
      price: '$39.99',
      description: 'For serious businesses',
      features: [
        'Unlimited sites',
        'Advanced templates',
        'Advanced analytics',
        'Priority support',
        '10GB storage',
        'E-commerce features',
        'API access',
      ],
      popular: false,
      cta: 'Start Free Trial',
      href: '/signup?plan=pro',
      priceId: 'price_pro_monthly', // Replace with your actual Stripe price ID
    },
    {
      name: 'Enterprise',
      price: '$79.99',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'Advanced security',
        'SLA guarantee',
        'Onboarding included',
      ],
      popular: false,
      cta: 'Contact Sales',
      href: '/contact',
      priceId: 'price_enterprise_monthly', // Replace with your actual Stripe price ID
    },
  ]

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Start Free, Scale Up
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that&apos;s right for your business. Start free, upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 card-shadow ${
                plan.popular
                  ? 'ring-2 ring-blue-600 shadow-xl scale-105'
                  : 'hover:shadow-xl transition-shadow duration-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== '$0' && <span className="text-gray-600">/month</span>}
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {plan.priceId ? (
                  <PaymentButton
                    priceId={plan.priceId}
                    planName={plan.name}
                    className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </PaymentButton>
                ) : (
                  <Link
                    href={plan.href}
                    className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 14-day free trial for all plans. No credit card required.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee for all plans, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
