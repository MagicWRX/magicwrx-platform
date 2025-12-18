'use client'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const { user, loading } = useAdminAuth()
  const [error, setError] = useState('')
  const supabase = createClient()
  const router = useRouter()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>
  }

  const handleLogout = async () => {
    setError('')
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/admin/login')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="flex items-center justify-between p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded hover:from-purple-500 hover:to-pink-500 transition"
        >
          Logout
        </button>
      </header>
      {error && <div className="text-red-400 text-center mt-2">{error}</div>}
      <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-900 rounded-lg p-6 shadow-lg hover:bg-gray-800 transition-colors">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">🎯 Master Control Guide</h2>
          <p className="text-gray-400 mb-4">Complete deployment, monitoring, and service management protocols.</p>
          <a href="/admin/control-guide" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm">
            Access Guide
          </a>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p className="text-gray-400">Manage users, roles, and permissions.</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Content</h2>
          <p className="text-gray-400">Edit blog posts, pages, and media.</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Analytics</h2>
          <p className="text-gray-400">View site analytics and reports.</p>
        </div>
      </main>
    </div>
  )
}
