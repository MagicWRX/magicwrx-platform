# Drag-and-Drop Site Builder Implementation Guide

## Overview

The drag-and-drop site builder is a comprehensive visual website editor that allows users to create professional websites without coding. It features:

- **Visual Drag & Drop Editor**: Intuitive component-based editing
- **Component Library**: Pre-built components (Header, Hero, Text, Image, Gallery, Contact, Button, Footer)
- **Real-time Customization**: Live editing of content and styles
- **Preview Mode**: See how the site looks to visitors
- **Save & Publish**: Automatic saving and publishing functionality

## Architecture

### Core Components

1. **DragDropEditor** (`src/components/DragDropEditor.tsx`)
   - Main editor interface with component library
   - Drag and drop functionality using @dnd-kit
   - Component rendering and selection

2. **CustomizationPanel** (`src/components/CustomizationPanel.tsx`)
   - Property editor for selected components
   - Content and style customization
   - Component deletion

3. **SiteBuilderPage** (`src/app/sites/[id]/builder/page.tsx`)
   - Main builder page with toolbar
   - Preview mode toggle
   - Save and publish functionality

4. **NewSitePage** (`src/app/sites/new/page.tsx`)
   - Site creation with template selection
   - Initial setup and routing

### Data Structure

```typescript
interface Component {
  id: string
  type: 'header' | 'hero' | 'gallery' | 'contact' | 'footer' | 'text' | 'image' | 'button'
  content: Record<string, any>
  styles: Record<string, any>
  isSelected: boolean
}

interface Site {
  id: string
  name: string
  userId: string
  components: Component[]
  customization?: Record<string, any>
  isPublished: boolean
  createdAt: Date
  updatedAt?: Date
  publishedAt?: Date
  domain?: string
  template?: string
}
```

## Component Library

### Available Components

1. **Header** 📋
   - Logo text and navigation menu
   - Customizable menu items
   - Background and text colors

2. **Hero Section** 🎯
   - Main banner with title, subtitle, and CTA
   - Background styling
   - Call-to-action button

3. **Text Block** 📝
   - Rich text content
   - Typography customization
   - Padding and margins

4. **Image** 🖼️
   - Image with URL, alt text, and caption
   - Border radius and sizing
   - Responsive design

5. **Gallery** 🖼️
   - Image grid layout
   - Multiple images with captions
   - Grid customization

6. **Contact Form** 📧
   - Customizable form fields
   - Form styling
   - Background and border options

7. **Button** 🔘
   - Call-to-action button
   - Custom text and link
   - Color and styling options

8. **Footer** 📄
   - Copyright text and links
   - Background styling
   - Link customization

## Features

### Drag & Drop Functionality

- **Component Reordering**: Drag components to reorder them
- **Component Selection**: Click to select and customize
- **Visual Feedback**: Selected components show blue border
- **Keyboard Support**: Full keyboard navigation

### Customization Options

#### Content Editing
- Text fields for titles, content, and links
- Image URL and alt text
- Form field configuration
- Menu item management

#### Style Customization
- Background colors
- Text colors
- Padding and margins
- Font sizes and weights
- Text alignment
- Border radius
- Border styles

### Preview Mode

- **Toggle Preview**: Switch between edit and preview modes
- **Live Preview**: See changes in real-time
- **Component Overview**: List of all components with details
- **Responsive Design**: Preview on different screen sizes

### Save & Publish

- **Auto-save**: Automatic saving of changes
- **Manual Save**: Manual save button
- **Publish**: Make site live for visitors
- **Version Control**: Track changes and updates

## Implementation Steps

### 1. Install Dependencies

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### 2. Create Type Definitions

Create `src/types/site-builder.ts` with shared interfaces for components and sites.

### 3. Build Core Components

1. **DragDropEditor**: Main editor with component library
2. **CustomizationPanel**: Property editor for components
3. **SiteBuilderPage**: Main builder interface
4. **NewSitePage**: Site creation page

### 4. Database Integration

```typescript
// Save site changes
await updateDoc(doc(db, 'sites', siteId), {
  components: site.components,
  customization: site.customization,
  updatedAt: new Date()
})

// Publish site
await updateDoc(doc(db, 'sites', siteId), {
  isPublished: true,
  publishedAt: new Date()
})
```

### 5. Navigation Integration

Update dashboard to include:
- "Create New Site" button
- Site list with "Edit" buttons
- Published/unpublished status

## Usage Flow

### Creating a New Site

1. User clicks "Create New Site" from dashboard
2. User enters site name and selects template
3. User is redirected to builder with empty site
4. User drags components from library to editor
5. User customizes components using property panel
6. User saves and publishes site

### Editing an Existing Site

1. User clicks "Edit" on site from dashboard
2. User is taken to builder with existing components
3. User can add, remove, or reorder components
4. User can customize component properties
5. User can preview changes
6. User saves and publishes updates

## Advanced Features

### Future Enhancements

1. **Template System**
   - Pre-built site templates
   - Template import/export
   - Custom template creation

2. **Advanced Components**
   - Video components
   - Social media feeds
   - E-commerce components
   - Blog components

3. **Advanced Styling**
   - CSS custom properties
   - Advanced animations
   - Custom fonts
   - Theme system

4. **Collaboration**
   - Multi-user editing
   - Version history
   - Comments and feedback

5. **Analytics**
   - Site performance metrics
   - User behavior tracking
   - A/B testing

## Testing

### Component Testing

```typescript
// Test component rendering
test('renders header component correctly', () => {
  const component = {
    id: 'test-header',
    type: 'header',
    content: { logo: 'Test Logo', menuItems: ['Home', 'About'] },
    styles: { backgroundColor: '#ffffff' }
  }
  
  render(<SortableComponent component={component} />)
  expect(screen.getByText('Test Logo')).toBeInTheDocument()
})

// Test drag and drop
test('reorders components on drag end', () => {
  const mockOnSiteChange = jest.fn()
  render(<DragDropEditor onSiteChange={mockOnSiteChange} />)
  
  // Simulate drag and drop
  fireEvent.dragStart(screen.getByTestId('component-1'))
  fireEvent.drop(screen.getByTestId('component-2'))
  
  expect(mockOnSiteChange).toHaveBeenCalledWith(expect.objectContaining({
    components: expect.arrayContaining([
      expect.objectContaining({ id: 'component-2' }),
      expect.objectContaining({ id: 'component-1' })
    ])
  }))
})
```

### Integration Testing

```typescript
// Test save functionality
test('saves site changes to database', async () => {
  const mockUpdateDoc = jest.fn()
  render(<SiteBuilderPage />)
  
  // Make changes
  fireEvent.click(screen.getByText('Save'))
  
  await waitFor(() => {
    expect(mockUpdateDoc).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        components: expect.any(Array),
        updatedAt: expect.any(Date)
      })
    )
  })
})
```

## Performance Optimization

### Lazy Loading

```typescript
// Lazy load components
const DragDropEditor = lazy(() => import('@/components/DragDropEditor'))
const CustomizationPanel = lazy(() => import('@/components/CustomizationPanel'))

// Use Suspense
<Suspense fallback={<div>Loading editor...</div>}>
  <DragDropEditor />
</Suspense>
```

### Memoization

```typescript
// Memoize expensive operations
const memoizedComponents = useMemo(() => 
  site.components.map(component => ({
    ...component,
    renderedContent: renderComponent(component)
  })), [site.components]
)
```

### Debounced Saving

```typescript
// Debounce save operations
const debouncedSave = useCallback(
  debounce(async (siteData) => {
    await updateDoc(doc(db, 'sites', siteId), siteData)
  }, 1000),
  [siteId]
)
```

## Security Considerations

### Input Validation

```typescript
// Validate component data
const validateComponent = (component: Component): boolean => {
  if (!component.id || !component.type) return false
  
  // Validate content based on type
  switch (component.type) {
    case 'header':
      return !!component.content.logo
    case 'image':
      return !!component.content.src && isValidUrl(component.content.src)
    default:
      return true
  }
}
```

### XSS Prevention

```typescript
// Sanitize user input
import DOMPurify from 'dompurify'

const sanitizeContent = (content: string): string => {
  return DOMPurify.sanitize(content)
}
```

## Deployment

### Build Optimization

```bash
# Build for production
npm run build

# Optimize bundle size
npm install --save-dev @next/bundle-analyzer
```

### Environment Variables

```env
# Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

## Monitoring & Analytics

### Error Tracking

```typescript
// Track builder errors
const trackBuilderError = (error: Error, context: string) => {
  console.error(`Builder error in ${context}:`, error)
  // Send to error tracking service
}
```

### Usage Analytics

```typescript
// Track component usage
const trackComponentUsage = (componentType: string) => {
  // Send analytics event
  analytics.track('component_added', { type: componentType })
}
```

## Conclusion

The drag-and-drop site builder provides a powerful, user-friendly way to create professional websites. With its modular architecture, extensive customization options, and real-time preview, it offers a competitive advantage in the website builder market.

The implementation is designed to be scalable, maintainable, and extensible for future enhancements. The component-based architecture allows for easy addition of new components and features as the platform grows. 