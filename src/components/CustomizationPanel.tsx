'use client'

import { useState, useEffect } from 'react'
import { Component, CustomizationPanelProps } from '@/types/site-builder'

export default function CustomizationPanel({ 
  component, 
  onComponentUpdate, 
  onDeleteComponent 
}: CustomizationPanelProps) {
  const [content, setContent] = useState<Record<string, any>>({})
  const [styles, setStyles] = useState<Record<string, any>>({})

  useEffect(() => {
    if (component) {
      setContent(component.content)
      setStyles(component.styles)
    }
  }, [component])

  const handleContentChange = (key: string, value: any) => {
    const newContent = { ...content, [key]: value }
    setContent(newContent)
    if (component) {
      onComponentUpdate(component.id, { content: newContent })
    }
  }

  const handleStyleChange = (key: string, value: any) => {
    const newStyles = { ...styles, [key]: value }
    setStyles(newStyles)
    if (component) {
      onComponentUpdate(component.id, { styles: newStyles })
    }
  }

  const handleDelete = () => {
    if (component) {
      onDeleteComponent(component.id)
    }
  }

  if (!component) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-lg font-semibold mb-2">Customization Panel</h3>
          <p className="text-sm">Select a component to customize its properties</p>
        </div>
      </div>
    )
  }

  const renderContentFields = () => {
    switch (component.type) {
      case 'header':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Logo Text</label>
              <input
                type="text"
                value={content.logo || ''}
                onChange={(e) => handleContentChange('logo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Menu Items</label>
              <textarea
                value={content.menuItems?.join(', ') || ''}
                onChange={(e) => handleContentChange('menuItems', e.target.value.split(', '))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Home, About, Services, Contact"
              />
            </div>
          </div>
        )

      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Text</label>
              <input
                type="text"
                value={content.ctaText || ''}
                onChange={(e) => handleContentChange('ctaText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Link</label>
              <input
                type="text"
                value={content.ctaLink || ''}
                onChange={(e) => handleContentChange('ctaLink', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )

      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Text Content</label>
            <textarea
              value={content.text || ''}
              onChange={(e) => handleContentChange('text', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
            />
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                value={content.src || ''}
                onChange={(e) => handleContentChange('src', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <input
                type="text"
                value={content.alt || ''}
                onChange={(e) => handleContentChange('alt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Caption</label>
              <input
                type="text"
                value={content.caption || ''}
                onChange={(e) => handleContentChange('caption', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Button Text</label>
              <input
                type="text"
                value={content.text || ''}
                onChange={(e) => handleContentChange('text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Link</label>
              <input
                type="text"
                value={content.link || ''}
                onChange={(e) => handleContentChange('link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Form Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Form Fields</label>
              <textarea
                value={content.fields?.join(', ') || ''}
                onChange={(e) => handleContentChange('fields', e.target.value.split(', '))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Name, Email, Message"
              />
            </div>
          </div>
        )

      case 'footer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Copyright Text</label>
              <input
                type="text"
                value={content.copyright || ''}
                onChange={(e) => handleContentChange('copyright', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Footer Links</label>
              <textarea
                value={content.links?.join(', ') || ''}
                onChange={(e) => handleContentChange('links', e.target.value.split(', '))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Privacy Policy, Terms of Service, Contact"
              />
            </div>
          </div>
        )

      default:
        return <div>No customization options available for this component type.</div>
    }
  }

  const renderStyleFields = () => {
    const commonStyles = [
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'color', label: 'Text Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'text' },
      { key: 'margin', label: 'Margin', type: 'text' },
      { key: 'fontSize', label: 'Font Size', type: 'text' },
      { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
      { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right', 'justify'] },
      { key: 'borderRadius', label: 'Border Radius', type: 'text' },
      { key: 'border', label: 'Border', type: 'text' },
    ]

    return (
      <div className="space-y-4">
        {commonStyles.map((style) => (
          <div key={style.key}>
            <label className="block text-sm font-medium mb-1">{style.label}</label>
            {style.type === 'color' ? (
              <input
                type="color"
                value={styles[style.key] || '#000000'}
                onChange={(e) => handleStyleChange(style.key, e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            ) : style.type === 'select' ? (
              <select
                value={styles[style.key] || ''}
                onChange={(e) => handleStyleChange(style.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select...</option>
                {style.options?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={styles[style.key] || ''}
                onChange={(e) => handleStyleChange(style.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder={style.key}
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Customize Component</h3>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Delete
        </button>
      </div>

      <div className="space-y-6">
        {/* Component Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Component Type</label>
          <div className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm">
            {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
          </div>
        </div>

        {/* Content Fields */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-gray-700">Content</h4>
          {renderContentFields()}
        </div>

        {/* Style Fields */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-gray-700">Styles</h4>
          {renderStyleFields()}
        </div>
      </div>
    </div>
  )
} 