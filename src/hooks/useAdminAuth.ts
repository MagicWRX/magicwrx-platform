import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'

const ADMIN_EMAILS = [
  'brian@amazinglystrange.com',
  'brian@magicwrx.com'
]

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!auth) {
      setUser(null)
      setLoading(false)
      router.replace('/admin/login')
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
      if (!firebaseUser || !ADMIN_EMAILS.includes(firebaseUser.email || '')) {
        router.replace('/admin/login')
      }
    })
    return () => unsubscribe()
  }, [router])

  return { user, loading }
} 