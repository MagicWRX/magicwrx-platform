'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import DragDropEditor from '@/components/DragDropEditor'
import CustomizationPanel from '@/components/CustomizationPanel'
import { Component } from '@/types/site-builder'

// Generate static params for static export
export async function generateStaticParams() {
  // Return empty array since this is a dynamic route that will be handled client-side
  return []
}

export default function SiteBuilderPage() {
  const params = useParams()
  const router = useRouter()
  const [site, setSite] = useState<any>(null)
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSiteData()
  }, [params.id])

  const fetchSiteData = async () => {
    if (!params.id || !db) return
    
    try {
      const siteDoc = await getDoc(doc(db, 'sites', params.id as string))
      if (siteDoc.exists()) {
        const siteData = { id: siteDoc.id, ...siteDoc.data() }
        setSite(siteData)
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error fetching site:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSiteChange = (updatedSite: any) => {
    setSite(updatedSite)
  }

  const handleComponentSelect = (component: Component | null) => {
    setSelectedComponent(component)
  }

  const handleComponentUpdate = (componentId: string, updates: Partial<Component>) => {
    if (!site) return

    const updatedComponents = site.components?.map((comp: Component) => 
      comp.id === componentId ? { ...comp, ...updates } : comp
    ) || []

    const updatedSite = { ...site, components: updatedComponents }
    setSite(updatedSite)
  }

  const handleDeleteComponent = (componentId: string) => {
    if (!site) return

    const updatedComponents = site.components?.filter((comp: Component) => comp.id !== componentId) || []
    const updatedSite = { ...site, components: updatedComponents }
    setSite(updatedSite)
    
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null)
    }
  }

  const handleSave = async () => {
    if (!site || !db) return
    
    setSaving(true)
    try {
      await updateDoc(doc(db, 'sites', site.id), {
        components: site.components,
        customization: site.customization,
        updatedAt: new Date()
      })
      // Show success message
      console.log('Site saved successfully!')
    } catch (error) {
      console.error('Error saving site:', error)
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!site || !db) return
    
    setSaving(true)
    try {
      await updateDoc(doc(db, 'sites', site.id), {
        isPublished: true,
        publishedAt: new Date(),
        components: site.components,
        customization: site.customization
      })
      // Show success message
      console.log('Site published successfully!')
    } catch (error) {
      console.error('Error publishing site:', error)
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Site not found</h2>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">{site.name}</h1>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">
            {site.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePreview}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isPreviewMode 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isPreviewMode ? 'Exit Preview' : 'Preview'}
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          
          <button
            onClick={handlePublish}
            disabled={saving || site.isPublished}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Publishing...' : site.isPublished ? 'Published' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex">
        {isPreviewMode ? (
          /* Preview Mode */
          <div className="flex-1 bg-gray-50 p-8">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto min-h-[600px]">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">Preview Mode</h2>
                <p className="text-gray-600 mb-6">
                  This is how your site will look to visitors.
                </p>
                
                {/* Preview Content */}
                <div className="space-y-4">
                  {site.components?.map((component: Component) => (
                    <div key={component.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">{component.type.charAt(0).toUpperCase() + component.type.slice(1)}</h3>
                      <div className="text-sm text-gray-600">
                        {component.type === 'header' && (
                          <div>Logo: {component.content.logo} | Menu: {component.content.menuItems?.join(', ')}</div>
                        )}
                        {component.type === 'hero' && (
                          <div>Title: {component.content.title} | Subtitle: {component.content.subtitle}</div>
                        )}
                        {component.type === 'text' && (
                          <div>Text: {component.content.text?.substring(0, 50)}...</div>
                        )}
                        {component.type === 'image' && (
                          <div>Image: {component.content.src}</div>
                        )}
                        {component.type === 'button' && (
                          <div>Button: {component.content.text}</div>
                        )}
                        {component.type === 'contact' && (
                          <div>Form: {component.content.title}</div>
                        )}
                        {component.type === 'footer' && (
                          <div>Footer: {component.content.copyright}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <>
            <DragDropEditor
              site={site}
              onSiteChange={handleSiteChange}
              selectedComponent={selectedComponent}
              onComponentSelect={handleComponentSelect}
            />
            
            <CustomizationPanel
              component={selectedComponent}
              onComponentUpdate={handleComponentUpdate}
              onDeleteComponent={handleDeleteComponent}
            />
          </>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-8 bg-gray-100 border-t border-gray-200 flex items-center justify-between px-6 text-sm text-gray-600">
        <div>
          {site.components?.length || 0} components • 
          Last saved: {site.updatedAt ? new Date(site.updatedAt.toDate()).toLocaleTimeString() : 'Never'}
        </div>
        <div>
          {isPreviewMode ? 'Preview Mode' : 'Edit Mode'}
        </div>
      </div>
    </div>
  )
} 