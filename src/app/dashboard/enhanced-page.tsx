'use client'

import { useSupabaseAuth } from '@/hooks/useSupabaseAuth'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getUserSites, deleteSite, publishSite, unpublishSite, type Site } from '@/lib/services/site-provisioning'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useSupabaseAuth()
  const [sites, setSites] = useState<Site[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Load user sites
      const { sites: userSites, error: sitesError } = await getUserSites()
      if (sitesError) {
        console.error('Error loading sites:', sitesError)
      } else {
        setSites(userSites)
      }

      // Load user profile
      const { data: profile, error: profileError } = await useSupabaseAuth().supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (profileError) {
        console.error('Error loading profile:', profileError)
      } else {
        setUserProfile(profile)
      }
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePublishToggle = async (siteId: string, isPublished: boolean) => {
    setActionLoading(siteId)
    try {
      const { error } = isPublished 
        ? await unpublishSite(siteId)
        : await publishSite(siteId)

      if (error) {
        alert(`Failed to ${isPublished ? 'unpublish' : 'publish'} site`)
      } else {
        await loadDashboardData()
      }
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteSite = async (siteId: string, siteTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${siteTitle}"? This action cannot be undone.`)) {
      return
    }

    setActionLoading(siteId)
    try {
      const { error } = await deleteSite(siteId)
      if (error) {
        alert('Failed to delete site')
      } else {
        await loadDashboardData()
      }
    } finally {
      setActionLoading(null)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  const canCreateMoreSites = !userProfile || sites.length < (userProfile?.sites_limit || 1)
  const subscriptionTier = userProfile?.subscription_tier || 'free'
  const sitesLimit = userProfile?.sites_limit || 1

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userProfile?.display_name || user.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/pricing"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {subscriptionTier === 'free' ? 'Upgrade Plan' : `${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} Plan`}
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-gray-600 hover:text-gray-900"
              >
                ⚙️ Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Sites</p>
                <p className="text-3xl font-bold text-gray-900">{sites.length}</p>
              </div>
              <div className="text-4xl">🌐</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{sites.length} of {sitesLimit} sites used</p>
          </div>

          <div className="bg-white rounded-lg p-6 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Published</p>
                <p className="text-3xl font-bold text-green-600">
                  {sites.filter(s => s.is_published).length}
                </p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Live websites</p>
          </div>

          <div className="bg-white rounded-lg p-6 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Drafts</p>
                <p className="text-3xl font-bold text-orange-600">
                  {sites.filter(s => !s.is_published).length}
                </p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">In development</p>
          </div>

          <div className="bg-white rounded-lg p-6 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Plan</p>
                <p className="text-xl font-bold text-blue-600 capitalize">{subscriptionTier}</p>
              </div>
              <div className="text-4xl">💎</div>
            </div>
            {subscriptionTier === 'free' && (
              <Link 
                href="/pricing"
                className="text-xs text-blue-600 hover:underline mt-2 inline-block"
              >
                Upgrade to create more sites →
              </Link>
            )}
          </div>
        </div>

        {/* Sites Section */}
        <div className="bg-white rounded-lg card-shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Websites</h2>
              <p className="text-sm text-gray-600">Manage and edit your websites</p>
            </div>
            {canCreateMoreSites ? (
              <Link
                href="/sites/new"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                + Create New Site
              </Link>
            ) : (
              <Link
                href="/pricing"
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Upgrade to Add More
              </Link>
            )}
          </div>

          <div className="p-6">
            {sites.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No websites yet</h3>
                <p className="text-gray-600 mb-6">Create your first website to get started</p>
                <Link
                  href="/sites/new"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Create Your First Site
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sites.map((site) => (
                  <div key={site.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{site.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{site.description}</p>
                        <p className="text-xs text-gray-500 font-mono">{site.domain}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        site.is_published 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {site.is_published ? 'Live' : 'Draft'}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Link
                        href={`/sites/${site.id}/builder`}
                        className="w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                      >
                        Edit Site
                      </Link>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {site.is_published && (
                          <a
                            href={`https://${site.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition text-sm font-medium text-gray-700"
                          >
                            🔗 View
                          </a>
                        )}
                        <button
                          onClick={() => handlePublishToggle(site.id, site.is_published)}
                          disabled={actionLoading === site.id}
                          className="py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition text-sm font-medium text-gray-700 disabled:opacity-50"
                        >
                          {actionLoading === site.id ? '...' : site.is_published ? '📥 Unpublish' : '🚀 Publish'}
                        </button>
                        <Link
                          href={`/sites/${site.id}/settings`}
                          className="text-center py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition text-sm font-medium text-gray-700"
                        >
                          ⚙️ Settings
                        </Link>
                        <button
                          onClick={() => handleDeleteSite(site.id, site.title)}
                          disabled={actionLoading === site.id}
                          className="py-2 rounded-lg border border-red-300 hover:bg-red-50 transition text-sm font-medium text-red-600 disabled:opacity-50"
                        >
                          {actionLoading === site.id ? '...' : '🗑️ Delete'}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                      Created {new Date(site.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/help" className="bg-white rounded-lg p-6 card-shadow hover:shadow-lg transition">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
            <p className="text-sm text-gray-600">Get help with building your website</p>
          </Link>

          <Link href="/templates" className="bg-white rounded-lg p-6 card-shadow hover:shadow-lg transition">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-900 mb-2">Browse Templates</h3>
            <p className="text-sm text-gray-600">Explore our template library</p>
          </Link>

          <Link href="/contact" className="bg-white rounded-lg p-6 card-shadow hover:shadow-lg transition">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-sm text-gray-600">Need help? We're here for you</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
