# 🛠️ Node.js Service Integration Protocols

## **Node.js Environment Setup**

### **Required Node.js Version**
- **Minimum**: Node.js 18.x
- **Recommended**: Node.js 20.x LTS
- **Package Manager**: npm (included with Node.js)

### **Version Check**
```bash
node --version
npm --version
```

## **Service Integration with Node.js**

### **1. Supabase + Node.js Integration**

#### **Installation**
```bash
npm install @supabase/supabase-js
```

#### **Client Setup** (`src/lib/supabase.ts`)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client (for API routes)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

#### **Database Operations**
```typescript
// Read data
const { data, error } = await supabase
  .from('users')
  .select('*')

// Insert data
const { data, error } = await supabase
  .from('users')
  .insert([{ name: 'John', email: 'john@example.com' }])

// Update data
const { data, error } = await supabase
  .from('users')
  .update({ name: 'Jane' })
  .eq('id', userId)
```

### **2. Firebase + Node.js Integration**

#### **Installation**
```bash
npm install firebase firebase-admin
```

#### **Client Setup** (`src/lib/firebase.ts`)
```typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
```

#### **Server-side Admin SDK**
```typescript
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  })
}

export const adminAuth = admin.auth()
export const adminDb = admin.firestore()
```

### **3. Stripe + Node.js Integration**

#### **Installation**
```bash
npm install stripe @stripe/stripe-js
```

#### **Server-side Setup** (`src/lib/stripe.ts`)
```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Client-side
import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)
```

### **4. Resend + Node.js Integration**

#### **Installation**
```bash
npm install resend
```

#### **Email Service Setup**
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Send email
await resend.emails.send({
  from: 'Magic WRX <hello@magicwrx.com>',
  to: [email],
  subject: 'Welcome to Magic WRX',
  html: '<p>Welcome to Magic WRX!</p>',
})
```

## **API Routes Structure**

### **Next.js API Routes** (`src/app/api/`)
```
api/
├── auth/
│   ├── login/route.ts
│   ├── logout/route.ts
│   └── register/route.ts
├── stripe/
│   ├── create-checkout/route.ts
│   ├── webhooks/route.ts
│   └── customer/route.ts
├── users/
│   ├── [id]/route.ts
│   └── route.ts
└── email/
    └── send/route.ts
```

### **Example API Route** (`src/app/api/users/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
    
    if (error) throw error
    
    return NextResponse.json({ users: data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('users')
      .insert([body])
      .select()
    
    if (error) throw error
    
    return NextResponse.json({ user: data[0] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
```

## **Environment Configuration for Node.js**

### **Package.json Scripts**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### **TypeScript Configuration** (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## **Database Schemas**

### **Supabase Tables**
```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sites table
CREATE TABLE sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  template_id TEXT,
  custom_domain TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Firebase Firestore Collections**
```typescript
// Collections structure
interface User {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  subscription: {
    tier: 'free' | 'basic' | 'pro'
    status: 'active' | 'cancelled'
    stripeCustomerId?: string
  }
  createdAt: Timestamp
}

interface Site {
  id: string
  userId: string
  name: string
  templateId: string
  components: Component[]
  published: boolean
  createdAt: Timestamp
}
```

## **Testing with Node.js**

### **Jest Configuration** (`jest.config.js`)
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### **API Testing Example**
```typescript
// __tests__/api/users.test.ts
import { GET, POST } from '@/app/api/users/route'
import { NextRequest } from 'next/server'

describe('/api/users', () => {
  it('should get users', async () => {
    const response = await GET()
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data).toHaveProperty('users')
  })
  
  it('should create user', async () => {
    const request = new NextRequest('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com'
      }),
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data).toHaveProperty('user')
  })
})
```

## **Error Handling & Logging**

### **Centralized Error Handler**
```typescript
// src/lib/errors.ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export function handleAPIError(error: unknown) {
  if (error instanceof APIError) {
    return new Response(
      JSON.stringify({ error: error.message, code: error.code }),
      { status: error.statusCode }
    )
  }
  
  console.error('Unexpected error:', error)
  return new Response(
    JSON.stringify({ error: 'Internal server error' }),
    { status: 500 }
  )
}
```

### **Logging Setup**
```typescript
// src/lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data || '')
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error || '')
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data || '')
  }
}
```

## **Performance Optimization**

### **Caching with Node.js**
```typescript
// src/lib/cache.ts
const cache = new Map()

export function getCached<T>(key: string): T | null {
  const cached = cache.get(key)
  if (cached && cached.expires > Date.now()) {
    return cached.data
  }
  return null
}

export function setCache<T>(key: string, data: T, ttl: number = 3600000) {
  cache.set(key, {
    data,
    expires: Date.now() + ttl
  })
}
```

### **Rate Limiting**
```typescript
// src/lib/rate-limit.ts
import { NextRequest } from 'next/server'

const requests = new Map()

export function rateLimit(req: NextRequest, limit: number = 100) {
  const ip = req.ip || 'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  
  if (!requests.has(ip)) {
    requests.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  const request = requests.get(ip)
  
  if (now > request.resetTime) {
    request.count = 1
    request.resetTime = now + windowMs
    return true
  }
  
  if (request.count >= limit) {
    return false
  }
  
  request.count++
  return true
}
```
