export interface Component {
  id: string
  type: 'header' | 'hero' | 'gallery' | 'contact' | 'footer' | 'text' | 'image' | 'button'
  content: Record<string, any>
  styles: Record<string, any>
  isSelected: boolean
}

export interface Site {
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

export interface DragDropEditorProps {
  site: any
  onSiteChange: (site: any) => void
  selectedComponent: Component | null
  onComponentSelect: (component: Component | null) => void
}

export interface CustomizationPanelProps {
  component: Component | null
  onComponentUpdate: (componentId: string, updates: Partial<Component>) => void
  onDeleteComponent: (componentId: string) => void
} 