'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth'

export default function NewSitePage() {
  const router = useRouter()
  const { user, supabase } = useSupabaseAuth()
  const [siteName, setSiteName] = useState('')
  const [template, setTemplate] = useState('blank')
  const [loading, setLoading] = useState(false)

  const templates = [
    { id: 'blank', name: 'Blank Site', description: 'Start with a clean slate', icon: '📄' },
    { id: 'business', name: 'Business', description: 'Professional business website', icon: '💼' },
    { id: 'portfolio', name: 'Portfolio', description: 'Showcase your work', icon: '🎨' },
    { id: 'blog', name: 'Blog', description: 'Share your thoughts and ideas', icon: '📝' },
    { id: 'ecommerce', name: 'E-commerce', description: 'Sell products online', icon: '🛒' },
  ]

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!siteName.trim() || !user) return

    setLoading(true)
    try {
      // 1. Create Site
      const { data: siteData, error: siteError } = await supabase
        .from('sites')
        .insert({
          title: siteName.trim(),
          owner_id: user.id,
          description: `Template: ${template}`,
          domain: `${siteName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')}.magicwrx.com`
        })
        .select()
        .single()

      if (siteError) throw siteError

      // 2. Create Home Page
      const { error: pageError } = await supabase
        .from('pages')
        .insert({
          site_id: siteData.id,
          slug: '/',
          body: { components: [] }
        })

      if (pageError) throw pageError

      router.push(`/sites/${siteData.id}/builder`)
    } catch (error) {
      console.error('Error creating site:', error)
      alert('Failed to create site. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to create a site</h2>
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your New Site</h1>
          <p className="text-lg text-gray-600">
            Choose a template and give your site a name to get started
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleCreateSite} className="space-y-6">
            {/* Site Name */}
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Enter your site name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Choose a Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((templateOption) => (
                  <div
                    key={templateOption.id}
                    onClick={() => setTemplate(templateOption.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      template === templateOption.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{templateOption.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{templateOption.name}</h3>
                    <p className="text-sm text-gray-600">{templateOption.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !siteName.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating...' : 'Create Site'}
              </button>
            </div>
          </form>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold mb-2">Drag & Drop Editor</h3>
            <p className="text-gray-600">Build your site visually with our intuitive drag-and-drop interface</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Mobile Responsive</h3>
            <p className="text-gray-600">Your site will look great on all devices automatically</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Fast & Secure</h3>
            <p className="text-gray-600">Built with modern technology for speed and security</p>
          </div>
        </div>
      </div>
    </div>
  )
}
