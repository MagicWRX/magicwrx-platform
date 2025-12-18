import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

const ADMIN_EMAILS = [
  'brian@amazinglystrange.com',
  'brian@magicwrx.com'
]

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
        router.replace('/admin/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user
      if (!currentUser || !ADMIN_EMAILS.includes(currentUser.email || '')) {
        router.replace('/admin/login')
        setUser(null)
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return { user, loading }
}
