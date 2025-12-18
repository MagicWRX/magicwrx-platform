'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Component, Site, DragDropEditorProps } from '@/types/site-builder'

// Component Library
const COMPONENT_LIBRARY = [
  {
    type: 'header',
    name: 'Header',
    icon: '📋',
    description: 'Navigation header with logo and menu',
    defaultContent: {
      logo: 'Your Logo',
      menuItems: ['Home', 'About', 'Services', 'Contact']
    },
    defaultStyles: {
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '1rem'
    }
  },
  {
    type: 'hero',
    name: 'Hero Section',
    icon: '🎯',
    description: 'Main banner section with title and CTA',
    defaultContent: {
      title: 'Welcome to Our Site',
      subtitle: 'We create amazing experiences',
      ctaText: 'Get Started',
      ctaLink: '#'
    },
    defaultStyles: {
      backgroundColor: '#f3f4f6',
      color: '#000000',
      padding: '4rem 2rem',
      textAlign: 'center'
    }
  },
  {
    type: 'text',
    name: 'Text Block',
    icon: '📝',
    description: 'Rich text content block',
    defaultContent: {
      text: 'Add your content here. This is a sample text block that you can customize with your own content.'
    },
    defaultStyles: {
      color: '#000000',
      fontSize: '1rem',
      lineHeight: '1.6',
      padding: '1rem'
    }
  },
  {
    type: 'image',
    name: 'Image',
    icon: '🖼️',
    description: 'Image with caption',
    defaultContent: {
      src: 'https://via.placeholder.com/400x300',
      alt: 'Sample image',
      caption: 'Image caption'
    },
    defaultStyles: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px'
    }
  },
  {
    type: 'gallery',
    name: 'Gallery',
    icon: '🖼️',
    description: 'Image gallery grid',
    defaultContent: {
      images: [
        { src: 'https://via.placeholder.com/300x200', alt: 'Gallery image 1' },
        { src: 'https://via.placeholder.com/300x200', alt: 'Gallery image 2' },
        { src: 'https://via.placeholder.com/300x200', alt: 'Gallery image 3' }
      ]
    },
    defaultStyles: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      padding: '1rem'
    }
  },
  {
    type: 'contact',
    name: 'Contact Form',
    icon: '📧',
    description: 'Contact form with fields',
    defaultContent: {
      title: 'Contact Us',
      fields: ['Name', 'Email', 'Message']
    },
    defaultStyles: {
      backgroundColor: '#f9fafb',
      padding: '2rem',
      borderRadius: '8px'
    }
  },
  {
    type: 'button',
    name: 'Button',
    icon: '🔘',
    description: 'Call-to-action button',
    defaultContent: {
      text: 'Click Me',
      link: '#'
    },
    defaultStyles: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer'
    }
  },
  {
    type: 'footer',
    name: 'Footer',
    icon: '📄',
    description: 'Site footer with links',
    defaultContent: {
      copyright: '© 2024 Your Company. All rights reserved.',
      links: ['Privacy Policy', 'Terms of Service', 'Contact']
    },
    defaultStyles: {
      backgroundColor: '#1f2937',
      color: '#ffffff',
      padding: '2rem',
      textAlign: 'center'
    }
  }
]

// Sortable Component
function SortableComponent({ 
  component, 
  onSelect, 
  isSelected
}: { 
  component: Component
  onSelect: (component: Component) => void
  isSelected: boolean
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const renderComponent = () => {
    switch (component.type) {
      case 'header':
        return (
          <header style={{ ...component.styles, ...style }} className={`component ${isSelected ? 'selected' : ''}`}>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">{component.content.logo}</div>
              <nav>
                <ul className="flex space-x-4">
                  {component.content.menuItems.map((item: string, index: number) => (
                    <li key={index} className="hover:text-blue-600 cursor-pointer">{item}</li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>
        )

      case 'hero':
        return (
          <section style={{ ...component.styles, ...style }} className={`component ${isSelected ? 'selected' : ''}`}>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">{component.content.title}</h1>
              <p className="text-xl mb-6">{component.content.subtitle}</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                {component.content.ctaText}
              </button>
            </div>
          </section>
        )

      case 'text':
        return (
          <div style={{ ...component.styles, ...style }} className={`component ${isSelected ? 'selected' : ''}`}>
            <p>{component.content.text}</p>
          </div>
        )

      case 'image':
        return (
          <div style={{ ...component.styles, ...style }} className={`component ${isSelected ? 'selected' : ''}`}>
            <Image 
              src={component.content.src} 
              alt={component.content.alt}
              style={component.styles}
              width={800}
              height={600}
            />
            {component.content.caption && (
              <p className="text-sm text-gray-600 mt-2">{component.content.caption}</p>
            )}
          </div>
        )

      case 'gallery':
        return (
          <div style={{ ...component.styles, ...style }} className={`component ${isSelected ? 'selected' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {component.content.images.map((image: any, index: number) => (
                <Image 
                  key={index}
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-48 object-cover rounded-lg"
                  width={400}
                  height={300}
                />
              ))}
            </div>
          </div>
        )

      case 'contact':
        return (
          <section style={{ ...component.styles, ...style }} className={`component ${isSelected ? 'selected' : ''}`}>
            <h2 className="text-2xl font-bold mb-4">{component.content.title}</h2>
            <form className="space-y-4">
              {component.content.fields.map((field: string, index: number) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-1">{field}</label>
                  {field === 'Message' ? (
                    <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={4} />
                  ) : (
                    <input 
                      type={field === 'Email' ? 'email' : 'text'} 
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </section>
        )

      case 'button':
        return (
          <div style={{ ...component.styles, ...style }} className={`component ${isSelected ? 'selected' : ''}`}>
            <button style={component.styles}>
              {component.content.text}
            </button>
          </div>
        )

      case 'footer':
        return (
          <footer style={{ ...component.styles, ...style }} className={`component ${isSelected ? 'selected' : ''}`}>
            <div className="text-center">
              <p className="mb-4">{component.content.copyright}</p>
              <div className="flex justify-center space-x-4">
                {component.content.links.map((link: string, index: number) => (
                  <a key={index} href="#" className="hover:underline">{link}</a>
                ))}
              </div>
            </div>
          </footer>
        )

      default:
        return <div>Unknown component type</div>
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onSelect(component)}
      className={`cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      {renderComponent()}
    </div>
  )
}

export default function DragDropEditor({ 
  site, 
  onSiteChange, 
  selectedComponent, 
  onComponentSelect 
}: DragDropEditorProps) {
  const [components, setComponents] = useState<Component[]>(site?.components || [])
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setDragOverId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    setDragOverId(event.over?.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        const newComponents = arrayMove(items, oldIndex, newIndex)
        if (site) {
          onSiteChange({ ...site, components: newComponents })
        }
        return newComponents
      })
    }

    setDragOverId(null)
  }

  const addComponent = (componentType: string) => {
    const componentTemplate = COMPONENT_LIBRARY.find(c => c.type === componentType)
    if (!componentTemplate) return

    const newComponent: Component = {
      id: `component-${Date.now()}`,
      type: componentType as Component['type'],
      content: componentTemplate.defaultContent,
      styles: componentTemplate.defaultStyles,
      isSelected: false
    }

    const newComponents = [...components, newComponent]
    setComponents(newComponents)
    onSiteChange({ ...site, components: newComponents })
  }

  const updateComponent = (componentId: string, updates: Partial<Component>) => {
    const newComponents = components.map(comp => 
      comp.id === componentId ? { ...comp, ...updates } : comp
    )
    setComponents(newComponents)
    onSiteChange({ ...site, components: newComponents })
  }

  const deleteComponent = (componentId: string) => {
    const newComponents = components.filter(comp => comp.id !== componentId)
    setComponents(newComponents)
    onSiteChange({ ...site, components: newComponents })
    if (selectedComponent?.id === componentId) {
      onComponentSelect(null)
    }
  }

  return (
    <div className="flex h-full">
      {/* Component Library */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Components</h3>
        <div className="space-y-2">
          {COMPONENT_LIBRARY.map((component) => (
            <div
              key={component.type}
              onClick={() => addComponent(component.type)}
              className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-colors"
            >
              <span className="text-2xl mr-3">{component.icon}</span>
              <div>
                <div className="font-medium">{component.name}</div>
                <div className="text-sm text-gray-600">{component.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 bg-white">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="p-8 min-h-screen">
            <SortableContext items={components.map(c => c.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                                 {components.map((component) => (
                   <SortableComponent
                     key={component.id}
                     component={component}
                     onSelect={onComponentSelect}
                     isSelected={selectedComponent?.id === component.id}
                   />
                 ))}
              </div>
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  )
} 