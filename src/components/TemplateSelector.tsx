'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Template {
  id: string
  name: string
  description: string
  category: string
  theme: string
  gradient: string
  icon: string
  price: string
  features: string[]
}

interface TemplateSelectorProps {
  selectedTemplate?: string
  onTemplateSelect?: (templateId: string) => void
  showPricing?: boolean
}

export default function TemplateSelector({ 
  selectedTemplate, 
  onTemplateSelect,
  showPricing = true 
}: TemplateSelectorProps) {
  const [selected, setSelected] = useState(selectedTemplate || 'portfolio')

  const templates: Template[] = [
    {
      id: 'portfolio',
      name: 'Creative Portfolio',
      description: 'Showcase your creative work, build your brand, and attract clients.',
      category: 'Portfolio',
      theme: 'Purple/Creative',
      gradient: 'from-purple-900 via-blue-900 to-indigo-900',
      icon: '🎨',
      price: 'Free',
      features: ['Visual Showcase', 'Client Ready', 'Fast & Responsive', 'SEO Optimized'],
    },
    {
      id: 'service',
      name: 'Professional Services',
      description: 'Complete service business website with booking systems.',
      category: 'Services',
      theme: 'Blue/Professional',
      gradient: 'from-blue-900 to-purple-900',
      icon: '💼',
      price: 'Basic',
      features: ['Online Booking', 'Client Portals', 'Service Showcase', 'Consultation Scheduling'],
    },
    {
      id: 'restaurant',
      name: 'Restaurant & Cafe',
      description: 'Digital menu and ordering system for restaurants.',
      category: 'Food & Beverage',
      theme: 'Red/Orange',
      gradient: 'from-red-900 to-yellow-900',
      icon: '🍽️',
      price: 'Basic',
      features: ['Online Ordering', 'Menu Management', 'Table Reservations', 'Loyalty Program'],
    },
    {
      id: 'ecommerce',
      name: 'Online Store',
      description: 'Complete e-commerce solution with shopping cart.',
      category: 'E-commerce',
      theme: 'Green/Commerce',
      gradient: 'from-green-900 to-teal-900',
      icon: '🛒',
      price: 'Pro',
      features: ['Shopping Cart', 'Payment Gateway', 'Inventory Management', 'Customer Dashboard'],
    },
    {
      id: 'saas',
      name: 'SaaS Platform',
      description: 'Full-featured SaaS application with user management.',
      category: 'SaaS',
      theme: 'Indigo/Purple',
      gradient: 'from-indigo-900 to-pink-900',
      icon: '💻',
      price: 'Pro',
      features: ['User Management', 'Subscription Billing', 'Analytics Dashboard', 'API Integration'],
    },
    {
      id: 'corporate',
      name: 'Corporate Website',
      description: 'Professional corporate website with team pages.',
      category: 'Corporate',
      theme: 'Gray/Professional',
      gradient: 'from-gray-900 to-zinc-900',
      icon: '🏢',
      price: 'Enterprise',
      features: ['Team Showcase', 'Service Pages', 'Investor Relations', 'Global Presence'],
    },
  ]

  const handleTemplateSelect = (templateId: string) => {
    setSelected(templateId)
    onTemplateSelect?.(templateId)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a template that matches your business type</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
              selected === template.id
                ? 'ring-2 ring-blue-600 shadow-lg scale-105'
                : 'hover:shadow-md hover:scale-102'
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            {/* Template Preview */}
            <div className={`h-32 bg-gradient-to-br ${template.gradient} rounded-lg flex items-center justify-center mb-4 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <span className="text-white text-4xl relative z-10">{template.icon}</span>
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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

            {/* Template Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {template.category}
                </span>
                <span className="text-xs text-gray-500">{template.theme}</span>
              </div>

              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>

              {/* Features */}
              <div className="space-y-1">
                {template.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-600">
                    <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
                {template.features.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{template.features.length - 2} more features
                  </div>
                )}
              </div>
            </div>

            {/* Selection Indicator */}
            {selected === template.id && (
              <div className="absolute top-4 left-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pricing Info */}
      {showPricing && (
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Template Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-gray-600">Free: Portfolio template included</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-gray-600">Basic: Service & Restaurant templates</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              <span className="text-gray-600">Pro: E-commerce & SaaS templates</span>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/pricing" className="text-blue-600 hover:text-blue-700 text-sm">
              View full pricing details →
            </Link>
          </div>
        </div>
      )}

      {/* Selected Template Summary */}
      {selected && (
        <div className="bg-blue-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Selected Template</h3>
          <div className="flex items-center">
            <span className="text-2xl mr-3">{templates.find(t => t.id === selected)?.icon}</span>
            <div>
              <div className="font-medium text-gray-900">{templates.find(t => t.id === selected)?.name}</div>
              <div className="text-sm text-gray-600">{templates.find(t => t.id === selected)?.description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 