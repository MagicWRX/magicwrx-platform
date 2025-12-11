# Immediate Implementation Steps for MagicWRX Freemium Platform

## 🚀 **Week 1: Foundation Setup**

### **Day 1: Install Dependencies**
```bash
# Install Stripe and Firebase Functions
npm install stripe @stripe/stripe-js firebase-functions
npm install --save-dev @types/stripe

# Install UI components
npm install @headlessui/react @heroicons/react
npm install react-hook-form @hookform/resolvers zod
npm install date-fns react-hot-toast recharts

# Install drag-and-drop functionality
npm install react-dnd react-dnd-html5-backend
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### **Day 2: Set Up Stripe Account**
1. Create Stripe account at https://stripe.com
2. Get API keys from Stripe Dashboard
3. Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### **Day 3: Install Firebase Extensions**
```bash
# Install Firebase Extensions for Stripe
firebase ext:install firestore-stripe-payments

# Configure the extension
firebase ext:configure firestore-stripe-payments
```

### **Day 4: Create Database Schema**
```typescript
// src/lib/database.ts
import { db } from './firebase'
import { collection, doc, setDoc } from 'firebase/firestore'

export const initializeUser = async (userId: string, userData: any) => {
  const userRef = doc(db, 'users', userId)
  await setDoc(userRef, {
    uid: userId,
    email: userData.email,
    displayName: userData.displayName,
    photoURL: userData.photoURL,
    createdAt: new Date(),
    subscription: {
      tier: 'free',
      status: 'active'
    },
    usage: {
      sites: 0,
      bandwidth: 0,
      storage: 0
    },
    settings: {
      adPreferences: true,
      analyticsEnabled: false,
      notifications: true
    }
  })
}

export const createSite = async (userId: string, siteData: any) => {
  const siteRef = doc(collection(db, 'sites'))
  await setDoc(siteRef, {
    id: siteRef.id,
    userId,
    name: siteData.name,
    domain: `${siteData.name.toLowerCase().replace(/\s+/g, '-')}.magicwrx.web.app`,
    subdomain: `${siteData.name.toLowerCase().replace(/\s+/g, '-')}.magicwrx.web.app`,
    template: siteData.template,
    customization: {
      colors: {},
      fonts: {},
      layout: {},
      content: {}
    },
    isPublished: false,
    analytics: {
      pageViews: 0,
      uniqueVisitors: 0,
      lastViewed: null
    },
    adSettings: {
      enabled: true,
      placement: 'footer',
      revenue: 0
    },
    seoSettings: {
      title: siteData.name,
      description: '',
      keywords: [],
      ogImage: null
    },
    createdAt: new Date()
  })
  return siteRef.id
}
```

### **Day 5: Create Site Builder Foundation**
```typescript
// src/app/sites/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from '@/hooks/useAuth'
import { createSite } from '@/lib/database'

export default function NewSitePage() {
  const { user } = useAuthState()
  const router = useRouter()
  const [siteName, setSiteName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [loading, setLoading] = useState(false)

  const templates = [
    { id: 'business', name: 'Business', category: 'business', tier: 'free' },
    { id: 'portfolio', name: 'Portfolio', category: 'portfolio', tier: 'free' },
    { id: 'ecommerce', name: 'E-commerce', category: 'ecommerce', tier: 'premium' },
    { id: 'blog', name: 'Blog', category: 'blog', tier: 'free' },
    { id: 'restaurant', name: 'Restaurant', category: 'restaurant', tier: 'premium' }
  ]

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !siteName || !selectedTemplate) return

    setLoading(true)
    try {
      const siteId = await createSite(user.uid, {
        name: siteName,
        template: selectedTemplate
      })
      router.push(`/sites/${siteId}/builder`)
    } catch (error) {
      console.error('Error creating site:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Site</h1>
      
      <form onSubmit={handleCreateSite} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Name
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="My Awesome Website"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Template
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-semibold">{template.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{template.category}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  template.tier === 'free' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {template.tier}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !siteName || !selectedTemplate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Site'}
        </button>
      </form>
    </div>
  )
}
```

### **Day 6: Basic Site Builder Interface**
```typescript
// src/app/sites/[id]/builder/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function SiteBuilderPage() {
  const params = useParams()
  const [site, setSite] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSiteData()
  }, [params.id])

  const fetchSiteData = async () => {
    if (!params.id || !db) return
    
    try {
      const siteDoc = await getDoc(doc(db, 'sites', params.id as string))
      if (siteDoc.exists()) {
        setSite({ id: siteDoc.id, ...siteDoc.data() })
      }
    } catch (error) {
      console.error('Error fetching site:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!site || !db) return
    
    try {
      await updateDoc(doc(db, 'sites', site.id), {
        customization: site.customization,
        updatedAt: new Date()
      })
      alert('Site saved successfully!')
    } catch (error) {
      console.error('Error saving site:', error)
    }
  }

  const handlePublish = async () => {
    if (!site || !db) return
    
    try {
      await updateDoc(doc(db, 'sites', site.id), {
        isPublished: true,
        publishedAt: new Date()
      })
      alert('Site published successfully!')
    } catch (error) {
      console.error('Error publishing site:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!site) {
    return <div>Site not found</div>
  }

  return (
    <div className="h-screen flex">
      {/* Toolbar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">{site.name}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Save
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Publish
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 bg-gray-50 p-8">
        <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Site Builder</h2>
          <p className="text-gray-600 mb-6">
            This is a basic site builder interface. Drag-and-drop functionality will be implemented next.
          </p>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Site Information</h3>
              <p><strong>Name:</strong> {site.name}</p>
              <p><strong>Domain:</strong> {site.domain}</p>
              <p><strong>Template:</strong> {site.template}</p>
              <p><strong>Status:</strong> {site.isPublished ? 'Published' : 'Draft'}</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Customization</h3>
              <p className="text-gray-600">Drag-and-drop editor coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### **Day 7: Update Header Navigation**
```typescript
// Update src/components/Header.tsx navigation
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Templates', href: '/templates' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
  { name: 'Help', href: '/troubleshooting' },
]

// Update auth buttons section
{user ? (
  <>
    <Link
      href="/dashboard"
      className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
    >
      Dashboard
    </Link>
    <button 
      onClick={handleSignOut}
      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
    >
      Sign Out
    </button>
  </>
) : (
  <>
    <Link
      href="/login"
      className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
    >
      Sign In
    </Link>
    <Link
      href="/signup"
      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
    >
      Start Free
    </Link>
  </>
)}
```

## 📋 **Week 1 Checklist**

- [ ] Install all dependencies
- [ ] Set up Stripe account and API keys
- [ ] Install Firebase Extensions
- [ ] Create database schema
- [ ] Create user dashboard
- [ ] Create site builder foundation
- [ ] Update navigation and pricing
- [ ] Test basic functionality

## 🎯 **Week 2 Goals**

1. **Payment Integration**
   - Implement Stripe checkout
   - Create subscription management
   - Add usage tracking

2. **Template System**
   - Create template marketplace
   - Implement tier restrictions
   - Add template previews

3. **Site Builder**
   - Implement drag-and-drop editor
   - Add component library
   - Create customization panel

4. **Publishing System**
   - Set up Firebase Hosting
   - Implement custom domains
   - Add site analytics

This foundation will give you a working freemium platform with basic functionality that you can build upon in subsequent weeks. 