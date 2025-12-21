/**
 * Site Provisioning Service
 * 
 * Handles creation and management of user websites based on base-template.
 * Each site gets its own subdomain and can be customized with themes and content.
 */

import { createClient } from '@/lib/supabase/client'

export interface SiteConfig {
  title: string
  template: 'base-template' | 'business' | 'portfolio' | 'blog' | 'ecommerce'
  description?: string
  theme?: {
    primaryColor?: string
    secondaryColor?: string
    fontFamily?: string
    logo?: string
    favicon?: string
  }
}

export interface Site {
  id: string
  owner_id: string
  title: string
  description: string | null
  domain: string
  custom_domain: string | null
  template_id: string
  is_published: boolean
  theme_config: any
  seo_config: any
  created_at: string
  updated_at: string
  published_at: string | null
}

/**
 * Creates a new site for a user
 */
export async function createSite(config: SiteConfig): Promise<{ site: Site | null; error: Error | null }> {
  const supabase = createClient()
  
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    // Check user's site limit
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('sites_limit, subscription_tier')
      .eq('id', user.id)
      .single()

    if (profileError) {
      throw new Error('Failed to fetch user profile')
    }

    // Count existing sites
    const { count, error: countError } = await supabase
      .from('sites')
      .select('*', { count: 'exact', head: true })
      .eq('owner_id', user.id)

    if (countError) {
      throw new Error('Failed to count existing sites')
    }

    if (count && count >= profile.sites_limit) {
      throw new Error(`Site limit reached (${profile.sites_limit} sites). Please upgrade your plan.`)
    }

    // Generate domain from title
    const slug = config.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    
    const domain = `${slug}-${user.id.slice(0, 8)}.magicwrx.com`

    // Create site record
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .insert({
        owner_id: user.id,
        title: config.title,
        description: config.description || `${config.title} - Built with MagicWRX`,
        domain,
        template_id: config.template,
        theme_config: config.theme || {
          primaryColor: '#3b82f6',
          secondaryColor: '#8b5cf6',
          fontFamily: 'Inter',
          logo: null,
          favicon: null
        },
        seo_config: {
          title: config.title,
          description: config.description || `${config.title} - Built with MagicWRX`,
          keywords: [],
          og_image: null
        }
      })
      .select()
      .single()

    if (siteError) {
      throw siteError
    }

    // Create default pages based on template
    await createDefaultPages(site.id, config.template)

    // Create analytics record
    await supabase
      .from('site_analytics')
      .insert({
        site_id: site.id,
        page_views: 0,
        unique_visitors: 0
      })

    return { site, error: null }
  } catch (error) {
    console.error('Site creation error:', error)
    return { site: null, error: error as Error }
  }
}

/**
 * Creates default pages for a new site based on template
 */
async function createDefaultPages(siteId: string, template: string) {
  const supabase = createClient()

  const defaultPages = getDefaultPagesForTemplate(template)

  const { error } = await supabase
    .from('pages')
    .insert(
      defaultPages.map(page => ({
        site_id: siteId,
        slug: page.slug,
        title: page.title,
        body: page.body,
        is_published: true,
        meta: {
          title: page.title,
          description: page.description || '',
          keywords: []
        }
      }))
    )

  if (error) {
    throw new Error(`Failed to create default pages: ${error.message}`)
  }
}

/**
 * Gets default page structure based on template type
 */
function getDefaultPagesForTemplate(template: string) {
  const templates: Record<string, any[]> = {
    'base-template': [
      {
        slug: '/',
        title: 'Home',
        description: 'Welcome to your new website',
        body: {
          layout: 'default',
          components: [
            {
              type: 'hero',
              data: {
                title: 'Welcome to Your New Website',
                subtitle: 'Start building your online presence today',
                ctaText: 'Get Started',
                ctaLink: '#'
              }
            }
          ]
        }
      }
    ],
    'business': [
      {
        slug: '/',
        title: 'Home',
        description: 'Business homepage',
        body: {
          layout: 'business',
          components: [
            { type: 'hero', data: { title: 'Your Business Name', subtitle: 'Professional services you can trust' } },
            { type: 'features', data: { items: [] } },
            { type: 'cta', data: { text: 'Contact Us Today' } }
          ]
        }
      },
      {
        slug: '/about',
        title: 'About Us',
        description: 'Learn about our company',
        body: { layout: 'page', components: [{ type: 'content', data: { text: 'About our company...' } }] }
      },
      {
        slug: '/services',
        title: 'Our Services',
        description: 'Services we offer',
        body: { layout: 'page', components: [{ type: 'services', data: { items: [] } }] }
      },
      {
        slug: '/contact',
        title: 'Contact',
        description: 'Get in touch with us',
        body: { layout: 'page', components: [{ type: 'contact-form', data: {} }] }
      }
    ],
    'portfolio': [
      {
        slug: '/',
        title: 'Portfolio',
        description: 'My creative work',
        body: {
          layout: 'portfolio',
          components: [
            { type: 'intro', data: { name: 'Your Name', title: 'Creative Professional' } },
            { type: 'gallery', data: { items: [] } }
          ]
        }
      },
      {
        slug: '/about',
        title: 'About Me',
        description: 'Learn about me',
        body: { layout: 'page', components: [] }
      }
    ],
    'blog': [
      {
        slug: '/',
        title: 'Blog',
        description: 'Latest posts',
        body: { layout: 'blog-list', components: [{ type: 'post-list', data: { posts: [] } }] }
      }
    ],
    'ecommerce': [
      {
        slug: '/',
        title: 'Shop',
        description: 'Browse our products',
        body: { layout: 'shop', components: [{ type: 'product-grid', data: { products: [] } }] }
      },
      {
        slug: '/cart',
        title: 'Shopping Cart',
        description: 'Your shopping cart',
        body: { layout: 'page', components: [{ type: 'cart', data: {} }] }
      }
    ]
  }

  return templates[template] || templates['base-template']
}

/**
 * Updates a site's configuration
 */
export async function updateSite(siteId: string, updates: Partial<Site>): Promise<{ success: boolean; error: Error | null }> {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('sites')
      .update(updates)
      .eq('id', siteId)

    if (error) throw error

    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

/**
 * Publishes a site (makes it publicly accessible)
 */
export async function publishSite(siteId: string): Promise<{ success: boolean; error: Error | null }> {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('sites')
      .update({
        is_published: true,
        published_at: new Date().toISOString()
      })
      .eq('id', siteId)

    if (error) throw error

    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

/**
 * Unpublishes a site
 */
export async function unpublishSite(siteId: string): Promise<{ success: boolean; error: Error | null }> {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('sites')
      .update({ is_published: false })
      .eq('id', siteId)

    if (error) throw error

    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

/**
 * Deletes a site and all its pages
 */
export async function deleteSite(siteId: string): Promise<{ success: boolean; error: Error | null }> {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('sites')
      .delete()
      .eq('id', siteId)

    if (error) throw error

    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

/**
 * Gets all sites for the current user
 */
export async function getUserSites(): Promise<{ sites: Site[]; error: Error | null }> {
  const supabase = createClient()

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    const { data: sites, error } = await supabase
      .from('sites')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { sites: sites || [], error: null }
  } catch (error) {
    return { sites: [], error: error as Error }
  }
}

/**
 * Gets a single site by ID
 */
export async function getSite(siteId: string): Promise<{ site: Site | null; error: Error | null }> {
  const supabase = createClient()

  try {
    const { data: site, error } = await supabase
      .from('sites')
      .select('*')
      .eq('id', siteId)
      .single()

    if (error) throw error

    return { site, error: null }
  } catch (error) {
    return { site: null, error: error as Error }
  }
}

/**
 * Gets site analytics
 */
export async function getSiteAnalytics(siteId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('site_analytics')
      .select('*')
      .eq('site_id', siteId)
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}
