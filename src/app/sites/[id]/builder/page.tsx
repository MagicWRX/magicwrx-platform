'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import DragDropEditor from '@/components/DragDropEditor'
import CustomizationPanel from '@/components/CustomizationPanel'
import { Component } from '@/types/site-builder'

export default function SiteBuilderPage() {
  const params = useParams()
  const router = useRouter()
  const [site, setSite] = useState<any>(null)
  const [page, setPage] = useState<any>(null)
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = useMemo(() => createClient(), [])

  const fetchSiteData = useCallback(async () => {
    if (!params.id) return
    
    try {
      // Fetch site
      const { data: siteData, error: siteError } = await supabase
        .from('sites')
        .select('*')
        .eq('id', params.id)
        .single()
      
      if (siteError || !siteData) {
        console.error('Error fetching site:', siteError)
        router.push('/dashboard')
        return
      }

      // Fetch home page
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('site_id', params.id)
        .eq('slug', '/')
        .single()

      if (pageError) {
         console.error('Error fetching page:', pageError)
      }

      setSite(siteData)
      setPage(pageData || { body: { components: [] } })
      
    } catch (error) {
      console.error('Error fetching site data:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id, router, supabase])

  useEffect(() => {
    fetchSiteData()
  }, [fetchSiteData])

  const handleSiteChange = (updatedSite: any) => {
    const components = updatedSite.components
    setPage({ ...page, body: { ...page.body, components } })
  }

  const handleComponentSelect = (component: Component | null) => {
    setSelectedComponent(component)
  }

  const handleComponentUpdate = (componentId: string, updates: Partial<Component>) => {
    if (!page) return

    const currentComponents = page.body?.components || []
    const updatedComponents = currentComponents.map((comp: Component) => 
      comp.id === componentId ? { ...comp, ...updates } : comp
    )

    const updatedPage = { ...page, body: { ...page.body, components: updatedComponents } }
    setPage(updatedPage)
  }

  const handleDeleteComponent = (componentId: string) => {
    if (!page) return

    const currentComponents = page.body?.components || []
    const updatedComponents = currentComponents.filter((comp: Component) => comp.id !== componentId)
    const updatedPage = { ...page, body: { ...page.body, components: updatedComponents } }
    setPage(updatedPage)
    
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null)
    }
  }

  const handleSave = async () => {
    if (!site || !page) return
    
    setSaving(true)
    try {
      // Update page
      const { error: pageError } = await supabase
        .from('pages')
        .update({
          body: page.body,
          updated_at: new Date().toISOString()
        })
        .eq('id', page.id)

      if (pageError) throw pageError

      // Update site timestamp
      await supabase
        .from('sites')
        .update({ created_at: site.created_at }) // Just touching the row? Schema doesn't have updated_at for sites.
        .eq('id', site.id)

      console.log('Site saved successfully!')
    } catch (error) {
      console.error('Error saving site:', error)
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    handleSave()
    alert('Published! (Mock)')
  }

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  const addComponent = (type: string, content: any) => {
    const newComponent = {
      id: `component-${Date.now()}`,
      type,
      content,
      position: { x: 0, y: 0 }
    }
    const currentComponents = page?.body?.components || []
    const updatedPage = { ...page, body: { ...page.body, components: [...currentComponents, newComponent] } }
    setPage(updatedPage)
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

  // Construct a site-like object for DragDropEditor if it expects components at root
  const siteForEditor = { ...site, components: page?.body?.components || [] }

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">{site.title}</h1>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">
            Draft
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
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Publishing...' : 'Publish'}
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
                  {page?.body?.components?.map((component: Component) => (
                    <div key={component.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">{component.type.charAt(0).toUpperCase() + component.type.slice(1)}</h3>
                      <div className="text-sm text-gray-600">
                        {component.type === 'header' && (
                          <div>
                            <p><strong>Title:</strong> {component.content?.title || 'No title'}</p>
                            <p><strong>Subtitle:</strong> {component.content?.subtitle || 'No subtitle'}</p>
                          </div>
                        )}
                        {component.type === 'text' && (
                          <div>
                            <p><strong>Content:</strong> {component.content?.text || 'No content'}</p>
                          </div>
                        )}
                        {component.type === 'image' && (
                          <div>
                            <p><strong>Alt Text:</strong> {component.content?.alt || 'No alt text'}</p>
                            <p><strong>URL:</strong> {component.content?.url || 'No image URL'}</p>
                          </div>
                        )}
                        {component.type === 'button' && (
                          <div>
                            <p><strong>Text:</strong> {component.content?.text || 'No button text'}</p>
                            <p><strong>Link:</strong> {component.content?.link || 'No link'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Component Library */}
            <div className="w-80 bg-gray-50 border-r border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4">Components</h3>
              <div className="space-y-2">
                <button
                  onClick={() => addComponent('header', { title: 'New Header', subtitle: 'Add your subtitle here' })}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="font-medium">Header</div>
                  <div className="text-sm text-gray-500">Title and subtitle section</div>
                </button>
                
                <button
                  onClick={() => addComponent('text', { text: 'Add your text content here' })}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="font-medium">Text</div>
                  <div className="text-sm text-gray-500">Rich text content</div>
                </button>
                
                <button
                  onClick={() => addComponent('image', { url: '', alt: 'Image description' })}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="font-medium">Image</div>
                  <div className="text-sm text-gray-500">Image with caption</div>
                </button>
                
                <button
                  onClick={() => addComponent('button', { text: 'Click me', link: '#' })}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="font-medium">Button</div>
                  <div className="text-sm text-gray-500">Call-to-action button</div>
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-white p-8">
              <DragDropEditor
                site={siteForEditor}
                onSiteChange={handleSiteChange}
                onComponentSelect={handleComponentSelect}
                selectedComponent={selectedComponent}
              />
            </div>

            {/* Customization Panel */}
            {selectedComponent && (
              <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
                <CustomizationPanel
                  component={selectedComponent}
                  onComponentUpdate={handleComponentUpdate}
                  onDeleteComponent={handleDeleteComponent}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
