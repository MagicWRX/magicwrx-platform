'use client'

import { useAuthState } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import Link from 'next/link'

interface Site {
  id: string
  name: string
  domain: string
  isPublished: boolean
  publishedAt?: Date
  analytics: {
    pageViews: number
    uniqueVisitors: number
  }
}

interface UserData {
  subscription: {
    tier: 'free' | 'basic' | 'pro' | 'enterprise'
    status: 'active' | 'cancelled' | 'past_due'
  }
  usage: {
    sites: number
    bandwidth: number
    storage: number
  }
}

export default function DashboardPage() {
  const { user, loading } = useAuthState()
  const [sites, setSites] = useState<Site[]>([])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserData()
      fetchUserSites()
    }
  }, [user])

  const fetchUserData = async () => {
    if (!user || !db) return
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const fetchUserSites = async () => {
    if (!user || !db) return
    
    try {
      const sitesQuery = query(collection(db, 'sites'), where('userId', '==', user.uid))
      const sitesSnapshot = await getDocs(sitesQuery)
      const sitesData = sitesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Site[]
      setSites(sitesData)
    } catch (error) {
      console.error('Error fetching sites:', error)
    } finally {
      setLoadingData(false)
    }
  }

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h2>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          href="/sites/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Site
        </Link>
      </div>

      {/* Subscription Status */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold capitalize">
              {userData?.subscription?.tier || 'free'} Plan
            </h2>
            <p className="text-gray-600">
              Status: {userData?.subscription?.status === 'active' ? 'Active' : 'Inactive'}
            </p>
          </div>
          {userData?.subscription?.tier === 'free' && (
            <Link
              href="/pricing"
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Upgrade Plan
            </Link>
          )}
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="text-3xl text-blue-600 mr-4">🌐</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Sites Created</p>
              <p className="text-2xl font-bold">{sites.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="text-3xl text-green-600 mr-4">📊</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Page Views</p>
              <p className="text-2xl font-bold">
                {sites.reduce((total, site) => total + (site.analytics?.pageViews || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="text-3xl text-purple-600 mr-4">🚀</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Published Sites</p>
              <p className="text-2xl font-bold">
                {sites.filter(site => site.isPublished).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Sites</h2>
          <Link
            href="/sites"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>

        {sites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">No sites yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first website to get started
            </p>
            <Link
              href="/sites/new"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Site
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.slice(0, 6).map((site) => (
              <div key={site.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{site.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    site.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {site.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{site.domain}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{site.analytics?.pageViews || 0} views</span>
                  <Link
                    href={`/sites/${site.id}/builder`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/templates"
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
        >
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="font-semibold mb-2">Browse Templates</h3>
          <p className="text-sm text-gray-600">Find the perfect template for your site</p>
        </Link>

        <Link
          href="/analytics"
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
        >
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-semibold mb-2">View Analytics</h3>
          <p className="text-sm text-gray-600">Track your site performance</p>
        </Link>

        <Link
          href="/settings"
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
        >
          <div className="text-3xl mb-3">⚙️</div>
          <h3 className="font-semibold mb-2">Settings</h3>
          <p className="text-sm text-gray-600">Manage your account preferences</p>
        </Link>

        <Link
          href="/support"
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
        >
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-semibold mb-2">Get Help</h3>
          <p className="text-sm text-gray-600">Contact support or view docs</p>
        </Link>
      </div>
    </div>
  )
} 