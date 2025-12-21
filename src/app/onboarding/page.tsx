'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { createSite } from '@/lib/services/site-provisioning'

type Step = 'account' | 'business' | 'template' | 'complete'

interface FormData {
  // Account details
  name: string
  email: string
  password: string
  
  // Business details
  companyName: string
  industry: string
  website: string
  
  // Site details
  siteTitle: string
  template: 'base-template' | 'business' | 'portfolio' | 'blog' | 'ecommerce'
}

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('account')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    companyName: '',
    industry: '',
    website: '',
    siteTitle: '',
    template: 'base-template'
  })

  const supabase = createClient()

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleAccountStep = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setCurrentStep('business')
  }

  const handleBusinessStep = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.companyName) {
      setError('Company name is required')
      return
    }

    setCurrentStep('template')
  }

  const handleTemplateStep = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. Create user account
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            display_name: formData.name,
            company_name: formData.companyName,
            industry: formData.industry,
            website: formData.website
          }
        }
      })

      if (signUpError) throw signUpError
      if (!authData.user) throw new Error('Failed to create user account')

      // Wait a moment for the profile trigger to complete
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 2. Create initial site
      const siteTitle = formData.siteTitle || formData.companyName || 'My Website'
      const { site, error: siteError } = await createSite({
        title: siteTitle,
        template: formData.template,
        description: `${siteTitle} - Built with MagicWRX`
      })

      if (siteError) {
        console.error('Site creation error:', siteError)
        // Don't fail onboarding if site creation fails - user can create it later
      }

      setCurrentStep('complete')
      
      // Redirect after showing success message
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (err: any) {
      console.error('Onboarding error:', err)
      setError(err.message || 'Failed to complete registration')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?step=business`,
        },
      })
      if (error) throw error
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const templates = [
    {
      id: 'base-template',
      name: 'Base Template',
      description: 'Clean and simple starting point',
      icon: '📄',
      features: ['Header & Footer', 'Responsive Design', 'SEO Optimized']
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Professional business website',
      icon: '💼',
      features: ['Home, About, Services, Contact', 'Call-to-action sections', 'Professional design']
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      description: 'Showcase your creative work',
      icon: '🎨',
      features: ['Project gallery', 'About section', 'Contact form']
    },
    {
      id: 'blog',
      name: 'Blog',
      description: 'Share your thoughts and ideas',
      icon: '📝',
      features: ['Blog post list', 'Article pages', 'Categories']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      description: 'Sell products online',
      icon: '🛒',
      features: ['Product catalog', 'Shopping cart', 'Checkout (coming soon)']
    }
  ]

  const steps = [
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'business', name: 'Business', icon: '🏢' },
    { id: 'template', name: 'Website', icon: '🌐' },
    { id: 'complete', name: 'Complete', icon: '✅' }
  ]

  const stepIndex = steps.findIndex(s => s.id === currentStep)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex flex-col items-center ${index <= stepIndex ? 'opacity-100' : 'opacity-50'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    index < stepIndex ? 'bg-green-500' : 
                    index === stepIndex ? 'bg-white' : 
                    'bg-gray-300'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="text-white text-sm mt-2 font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${index < stepIndex ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Step 1: Account Details */}
          {currentStep === 'account' && (
            <form onSubmit={handleAccountStep} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                <p className="text-gray-600">Let's start by setting up your account</p>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center font-medium"
                disabled={loading}
              >
                <span className="mr-2">🔐</span>
                Continue with Google
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Continue →
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </a>
              </p>
            </form>
          )}

          {/* Step 2: Business Information */}
          {currentStep === 'business' && (
            <form onSubmit={handleBusinessStep} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Your Business</h1>
                <p className="text-gray-600">This helps us personalize your experience</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company/Business Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Acme Inc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select an industry</option>
                  <option value="technology">Technology</option>
                  <option value="retail">Retail/E-commerce</option>
                  <option value="services">Professional Services</option>
                  <option value="creative">Creative/Design</option>
                  <option value="restaurant">Restaurant/Food</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Existing Website (optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep('account')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Continue →
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Template Selection */}
          {currentStep === 'template' && (
            <form onSubmit={handleTemplateStep} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Template</h1>
                <p className="text-gray-600">Select a starting point for your website</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website Name</label>
                <input
                  type="text"
                  value={formData.siteTitle}
                  onChange={(e) => updateFormData('siteTitle', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder={formData.companyName || 'My Website'}
                />
                <p className="text-sm text-gray-500 mt-1">Leave blank to use your company name</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => updateFormData('template', template.id as any)}
                    className={`text-left p-4 rounded-lg border-2 transition ${
                      formData.template === template.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="text-3xl mr-3">{template.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          {template.features.map((feature, index) => (
                            <li key={index}>✓ {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep('business')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                  disabled={loading}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Creating Your Website...' : 'Complete Setup →'}
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Complete */}
          {currentStep === 'complete' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to MagicWRX!</h1>
              <p className="text-gray-600 mb-8">Your account and website have been created successfully.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Next steps:</strong>
                </p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1 text-left max-w-md mx-auto">
                  <li>✓ Customize your website design</li>
                  <li>✓ Add your content and pages</li>
                  <li>✓ Publish to make it live</li>
                  <li>✓ Connect your custom domain</li>
                </ul>
              </div>
              <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
