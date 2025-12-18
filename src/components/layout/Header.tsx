'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, loading, supabase } = useSupabaseAuth()
  const router = useRouter()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Templates', href: '/templates' },
    { name: 'Tools', href: '/tools' },
    { name: 'Build Site', href: '/sites/new' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Help', href: '/troubleshooting' },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="bg-background shadow-sm sticky top-0 z-50 border-b border-border">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">Magic WRX</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <>
                <Link
                  href="/admin"
                  className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Button 
                  onClick={handleSignOut}
                  variant="destructive"
                  size="sm"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link
                        href="/admin"
                        className="block text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button 
                        onClick={() => {
                          handleSignOut()
                          setIsMenuOpen(false)
                        }}
                        className="block w-full text-left bg-red-600 text-white px-3 py-2 text-base font-medium hover:bg-red-700 transition-colors rounded-md mt-2"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="block bg-blue-600 text-white px-3 py-2 text-base font-medium hover:bg-blue-700 transition-colors rounded-md mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
