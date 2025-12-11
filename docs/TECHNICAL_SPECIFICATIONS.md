# Technical Specifications - MagicWRX Dual Login & mxn-chat Migration

## Project Architecture Overview

```
MagicWRX/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 (public)/                    # Public routes - no auth required
│   │   │   ├── 📄 page.tsx                 # Homepage
│   │   │   ├── 📁 templates/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📁 ecommerce/
│   │   │   │   ├── 📁 saas/
│   │   │   │   ├── 📁 portfolio/
│   │   │   │   ├── 📁 restaurant/
│   │   │   │   └── 📁 corporate/
│   │   │   ├── 📁 pricing/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 contact/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 help/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 docs/
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 (auth)/                      # Authentication routes
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx            # Regular user login
│   │   │   ├── 📁 create-account/
│   │   │   │   └── 📄 page.tsx            # User registration
│   │   │   ├── 📁 forgot-password/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 admin/
│   │   │       ├── 📁 login/
│   │   │       │   └── 📄 page.tsx        # Admin-only login
│   │   │       └── 📁 setup/
│   │   │           └── 📄 page.tsx
│   │   ├── 📁 (user)/                      # Protected user routes
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📄 loading.tsx
│   │   │   │   └── 📄 layout.tsx
│   │   │   ├── 📁 profile/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📁 settings/
│   │   │   ├── 📁 billing/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📁 subscription/
│   │   │   └── 📁 projects/
│   │   │       ├── 📄 page.tsx
│   │   │       ├── 📁 new/
│   │   │       └── 📁 [id]/
│   │   ├── 📁 (admin)/                     # Protected admin routes
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📄 layout.tsx
│   │   │   ├── 📁 users/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📁 [id]/
│   │   │   │   └── 📁 management/
│   │   │   ├── 📁 analytics/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📁 reports/
│   │   │   ├── 📁 content/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📁 templates/
│   │   │   │   └── 📁 pages/
│   │   │   └── 📁 control-guide/
│   │   │       └── 📄 page.tsx            # Master control guide
│   │   ├── 📁 (chat)/                      # Migrated chat functionality
│   │   │   ├── 📁 rooms/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📁 [id]/
│   │   │   │   └── 📁 create/
│   │   │   ├── 📁 friends/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📁 requests/
│   │   │   ├── 📁 profile/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 settings/
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 api/                         # API routes
│   │   │   ├── 📁 auth/
│   │   │   │   ├── 📄 route.ts
│   │   │   │   ├── 📁 login/
│   │   │   │   ├── 📁 register/
│   │   │   │   └── 📁 admin/
│   │   │   ├── 📁 chat/
│   │   │   │   ├── 📄 route.ts
│   │   │   │   ├── 📁 rooms/
│   │   │   │   ├── 📁 messages/
│   │   │   │   └── 📁 users/
│   │   │   ├── 📁 stripe/
│   │   │   │   ├── 📁 checkout/
│   │   │   │   ├── 📁 webhooks/
│   │   │   │   └── 📁 subscription/
│   │   │   ├── 📁 email/
│   │   │   │   ├── 📁 send/
│   │   │   │   └── 📁 templates/
│   │   │   └── 📁 admin/
│   │   │       ├── 📁 users/
│   │   │       ├── 📁 analytics/
│   │   │       └── 📁 system/
│   │   ├── 📄 layout.tsx                   # Root layout
│   │   ├── 📄 globals.css                  # Global styles
│   │   ├── 📄 loading.tsx                  # Global loading
│   │   ├── 📄 error.tsx                    # Global error
│   │   └── 📄 not-found.tsx               # 404 page
│   ├── 📁 components/
│   │   ├── 📁 ui/                          # Reusable UI components
│   │   │   ├── 📄 Button.tsx
│   │   │   ├── 📄 Input.tsx
│   │   │   ├── 📄 Modal.tsx
│   │   │   ├── 📄 Card.tsx
│   │   │   ├── 📄 LoadingSpinner.tsx
│   │   │   ├── 📄 Alert.tsx
│   │   │   └── 📄 Badge.tsx
│   │   ├── 📁 auth/                        # Authentication components
│   │   │   ├── 📄 LoginForm.tsx
│   │   │   ├── 📄 RegisterForm.tsx
│   │   │   ├── 📄 AdminLoginForm.tsx
│   │   │   ├── 📄 PasswordReset.tsx
│   │   │   ├── 📄 GoogleAuthButton.tsx
│   │   │   └── 📄 AuthGuard.tsx
│   │   ├── 📁 layout/                      # Layout components
│   │   │   ├── 📄 Header.tsx
│   │   │   ├── 📄 Footer.tsx
│   │   │   ├── 📄 Sidebar.tsx
│   │   │   ├── 📄 Navigation.tsx
│   │   │   ├── 📄 UserNavigation.tsx
│   │   │   ├── 📄 AdminNavigation.tsx
│   │   │   └── 📄 ChatNavigation.tsx
│   │   ├── 📁 dashboard/                   # Dashboard components
│   │   │   ├── 📄 UserDashboard.tsx
│   │   │   ├── 📄 AdminDashboard.tsx
│   │   │   ├── 📄 StatsCard.tsx
│   │   │   ├── 📄 RecentActivity.tsx
│   │   │   ├── 📄 QuickActions.tsx
│   │   │   └── 📄 SystemStatus.tsx
│   │   ├── 📁 chat/                        # Migrated chat components
│   │   │   ├── 📄 ChatInterface.tsx
│   │   │   ├── 📄 MessageList.tsx
│   │   │   ├── 📄 MessageInput.tsx
│   │   │   ├── 📄 RoomSidebar.tsx
│   │   │   ├── 📄 UserList.tsx
│   │   │   ├── 📄 TypingIndicator.tsx
│   │   │   ├── 📄 EmojiPicker.tsx
│   │   │   ├── 📄 FileUpload.tsx
│   │   │   └── 📄 ChatSettings.tsx
│   │   ├── 📁 business/                    # Business-specific components
│   │   │   ├── 📄 Hero.tsx
│   │   │   ├── 📄 Features.tsx
│   │   │   ├── 📄 TemplateShowcase.tsx
│   │   │   ├── 📄 PricingTable.tsx
│   │   │   ├── 📄 ContactForm.tsx
│   │   │   ├── 📄 Testimonials.tsx
│   │   │   └── 📄 CallToAction.tsx
│   │   └── 📁 admin/                       # Admin-specific components
│   │       ├── 📄 UserManagement.tsx
│   │       ├── 📄 AnalyticsDashboard.tsx
│   │       ├── 📄 ContentManager.tsx
│   │       ├── 📄 SystemMonitor.tsx
│   │       ├── 📄 ConfigurationPanel.tsx
│   │       └── 📄 AuditLog.tsx
│   ├── 📁 contexts/                        # React contexts
│   │   ├── 📄 AuthContext.tsx             # Unified authentication
│   │   ├── 📄 ChatContext.tsx             # Migrated chat context
│   │   ├── 📄 ThemeContext.tsx            # Theme management
│   │   ├── 📄 UserContext.tsx             # User profile management
│   │   └── 📄 AdminContext.tsx            # Admin-specific context
│   ├── 📁 hooks/                          # Custom React hooks
│   │   ├── 📄 useAuth.ts                  # Authentication hook
│   │   ├── 📄 useSupabase.ts              # Supabase integration
│   │   ├── 📄 useChat.ts                  # Chat functionality
│   │   ├── 📄 useRealtime.ts              # Real-time subscriptions
│   │   ├── 📄 useAdmin.ts                 # Admin functionality
│   │   ├── 📄 useLocalStorage.ts          # Local storage management
│   │   └── 📄 useDebounce.ts              # Debouncing utility
│   ├── 📁 lib/                            # Utility libraries
│   │   ├── 📄 firebase.ts                 # Firebase configuration
│   │   ├── 📄 supabase.ts                 # Supabase client
│   │   ├── 📄 stripe.ts                   # Stripe integration
│   │   ├── 📄 resend.ts                   # Email service
│   │   ├── 📄 auth.ts                     # Authentication utilities
│   │   ├── 📄 database.ts                 # Database helpers
│   │   ├── 📄 validation.ts               # Form validation
│   │   ├── 📄 encryption.ts               # Data encryption
│   │   ├── 📄 utils.ts                    # General utilities
│   │   └── 📄 constants.ts                # Application constants
│   ├── 📁 types/                          # TypeScript type definitions
│   │   ├── 📄 auth.ts                     # Authentication types
│   │   ├── 📄 user.ts                     # User profile types
│   │   ├── 📄 chat.ts                     # Chat-related types
│   │   ├── 📄 admin.ts                    # Admin-specific types
│   │   ├── 📄 business.ts                 # Business logic types
│   │   ├── 📄 api.ts                      # API response types
│   │   └── 📄 database.ts                 # Database schema types
│   ├── 📁 styles/                         # Styling files
│   │   ├── 📄 globals.css                 # Global CSS
│   │   ├── 📄 components.css              # Component-specific styles
│   │   ├── 📄 chat.css                    # Chat interface styles
│   │   └── 📄 admin.css                   # Admin panel styles
│   └── 📁 middleware/                     # Next.js middleware
│       ├── 📄 auth.ts                     # Authentication middleware
│       ├── 📄 admin.ts                    # Admin protection middleware
│       └── 📄 rate-limit.ts               # Rate limiting middleware
├── 📁 public/                             # Static assets
│   ├── 📁 images/
│   │   ├── 📁 templates/
│   │   ├── 📁 logos/
│   │   ├── 📁 icons/
│   │   └── 📁 avatars/
│   ├── 📁 docs/
│   │   ├── 📄 api-reference.pdf
│   │   └── 📄 user-guide.pdf
│   ├── 📄 favicon.ico
│   ├── 📄 manifest.json
│   └── 📄 robots.txt
├── 📁 docs/                               # Project documentation
│   ├── 📄 TECHNICAL_SPECIFICATIONS.md
│   ├── 📄 DUAL_LOGIN_MIGRATION_PLAN.md
│   ├── 📄 API_DOCUMENTATION.md
│   ├── 📄 DEPLOYMENT_GUIDE.md
│   ├── 📄 SECURITY_PROTOCOLS.md
│   └── 📄 TROUBLESHOOTING.md
├── 📁 scripts/                            # Automation scripts
│   ├── 📄 deploy.sh
│   ├── 📄 migrate-data.sh
│   ├── 📄 setup-env.sh
│   ├── 📄 backup-db.sh
│   └── 📄 test-integrations.sh
├── 📁 tests/                              # Testing files
│   ├── 📁 __tests__/
│   ├── 📁 e2e/
│   ├── 📁 integration/
│   ├── 📁 unit/
│   └── 📄 setup.ts
├── 📄 package.json                        # Dependencies and scripts
├── 📄 package-lock.json
├── 📄 next.config.js                      # Next.js configuration
├── 📄 tailwind.config.js                  # Tailwind CSS configuration
├── 📄 tsconfig.json                       # TypeScript configuration
├── 📄 .env.local                          # Environment variables
├── 📄 .env.example                        # Environment template
├── 📄 .gitignore                          # Git ignore rules
├── 📄 README.md                           # Project overview
├── 📄 firebase.json                       # Firebase configuration
├── 📄 vercel.json                         # Vercel deployment config
└── 📄 supabase.json                       # Supabase configuration
```

## Dual Authentication System

### 1. User Types & Access Levels

```typescript
// src/types/auth.ts
export type UserRole = 'user' | 'admin' | 'chat_user' | 'super_admin';

export interface UnifiedUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
  profile: UserProfile;
  permissions: Permission[];
}

export interface UserProfile {
  displayName: string;
  avatar?: string;
  businessProfile?: BusinessProfile;
  chatProfile?: ChatProfile;
  adminProfile?: AdminProfile;
}

export interface BusinessProfile {
  companyName?: string;
  industry?: string;
  website?: string;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  projects: Project[];
}

export interface ChatProfile {
  gamingAlias: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  rooms: string[];
  friends: string[];
  preferences: ChatPreferences;
}

export interface AdminProfile {
  department: string;
  accessLevel: number;
  lastAdminAction: Date;
  auditLog: AuditEntry[];
}
```

### 2. Authentication Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Landing Page  │    │  Authentication │    │   Role-Based    │
│                 │───▶│     Gateway     │───▶│   Routing       │
│ /login          │    │                 │    │                 │
│ /create-account │    │ Firebase Auth   │    │ /dashboard      │
│ /admin/login    │    │ Role Detection  │    │ /admin/*        │
└─────────────────┘    └─────────────────┘    │ /chat/*         │
                                              └─────────────────┘
```

### 3. Route Protection Matrix

| Route Pattern      | User Role      | Access Level | Redirect On Fail |
|-------------------|----------------|--------------|------------------|
| `/`               | Public         | None         | N/A              |
| `/login`          | Public         | None         | /dashboard       |
| `/create-account` | Public         | None         | /dashboard       |
| `/admin/login`    | Public         | None         | /admin/dashboard |
| `/dashboard`      | user           | Authenticated| /login           |
| `/admin/*`        | admin          | Admin        | /admin/login     |
| `/chat/*`         | chat_user      | Chat Access  | /login           |
| `/api/admin/*`    | admin          | API Admin    | 403 Error        |

## Database Schema Migration

### Supabase Tables Structure

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'user',
  display_name VARCHAR(100),
  avatar_url TEXT,
  business_profile JSONB,
  chat_profile JSONB,
  admin_profile JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat rooms (migrated from Firebase)
CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type room_type DEFAULT 'public',
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages (migrated from Firebase)
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type message_type DEFAULT 'text',
  attachments JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions and activity tracking
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin audit log
CREATE TABLE admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50),
  target_id UUID,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Real-time Subscriptions

```typescript
// src/hooks/useRealtime.ts
export const useRealtimeChat = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    const channel = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${roomId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  return messages;
};
```

## API Routes Specification

### Authentication Endpoints

```
POST /api/auth/login
├── Body: { email: string, password: string, role?: UserRole }
├── Response: { user: UnifiedUser, token: string, redirectUrl: string }
└── Errors: 401, 422, 500

POST /api/auth/register
├── Body: { email: string, password: string, profile: UserProfile }
├── Response: { user: UnifiedUser, token: string }
└── Errors: 409, 422, 500

POST /api/auth/admin/login
├── Body: { email: string, password: string }
├── Headers: { 'x-admin-token': string }
├── Response: { admin: UnifiedUser, adminToken: string }
└── Errors: 401, 403, 500

POST /api/auth/logout
├── Headers: { 'Authorization': 'Bearer <token>' }
├── Response: { success: boolean }
└── Errors: 401, 500
```

### Chat API Endpoints

```
GET /api/chat/rooms
├── Headers: { 'Authorization': 'Bearer <token>' }
├── Query: { page?: number, limit?: number }
├── Response: { rooms: ChatRoom[], pagination: Pagination }
└── Errors: 401, 500

POST /api/chat/messages
├── Headers: { 'Authorization': 'Bearer <token>' }
├── Body: { roomId: string, content: string, type?: MessageType }
├── Response: { message: Message }
└── Errors: 401, 403, 422, 500

GET /api/chat/messages/[roomId]
├── Headers: { 'Authorization': 'Bearer <token>' }
├── Query: { before?: string, limit?: number }
├── Response: { messages: Message[], hasMore: boolean }
└── Errors: 401, 403, 500
```

### Admin API Endpoints

```
GET /api/admin/users
├── Headers: { 'Authorization': 'Bearer <admin-token>' }
├── Query: { page?: number, search?: string, role?: UserRole }
├── Response: { users: UnifiedUser[], pagination: Pagination }
└── Errors: 401, 403, 500

PUT /api/admin/users/[id]
├── Headers: { 'Authorization': 'Bearer <admin-token>' }
├── Body: Partial<UnifiedUser>
├── Response: { user: UnifiedUser }
└── Errors: 401, 403, 404, 422, 500

GET /api/admin/analytics
├── Headers: { 'Authorization': 'Bearer <admin-token>' }
├── Query: { period?: string, metrics?: string[] }
├── Response: { analytics: AnalyticsData }
└── Errors: 401, 403, 500
```

## Security Implementation

### Middleware Chain

```typescript
// src/middleware.ts
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes - no authentication required
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }
  
  // Admin routes - require admin authentication
  if (pathname.startsWith('/admin')) {
    return await adminAuthMiddleware(request);
  }
  
  // Chat routes - require chat user authentication
  if (pathname.startsWith('/chat')) {
    return await chatAuthMiddleware(request);
  }
  
  // User routes - require basic authentication
  return await userAuthMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### Role-Based Access Control (RBAC)

```typescript
// src/lib/auth.ts
export const checkPermission = (
  user: UnifiedUser,
  resource: string,
  action: string
): boolean => {
  const userPermissions = getUserPermissions(user.role);
  return userPermissions.some(permission => 
    permission.resource === resource && 
    permission.actions.includes(action)
  );
};

export const requireRole = (roles: UserRole[]) => {
  return (req: NextRequest) => {
    const user = getUserFromToken(req);
    if (!user || !roles.includes(user.role)) {
      throw new Error('Insufficient permissions');
    }
    return user;
  };
};
```

## Environment Configuration

### Development Environment

```bash
# .env.local
# Firebase Configuration (transitional)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=magic-wrx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=magic-wrx

# Supabase Configuration (primary)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend Configuration
RESEND_API_KEY=re_...

# Security Configuration
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...

# Admin Configuration
ADMIN_EMAIL=admin@magicwrx.com
ADMIN_SETUP_KEY=your-admin-setup-key

# Feature Flags
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_DEBUG_MODE=true
```

### Production Environment

```bash
# Vercel Environment Variables
VERCEL_URL=magic-wrx.vercel.app
NODE_ENV=production

# Database URLs
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# Monitoring
SENTRY_DSN=https://...
LOGFLARE_API_KEY=...

# CDN Configuration
NEXT_PUBLIC_CDN_URL=https://cdn.magicwrx.com
```

## Deployment Architecture

### Vercel Configuration

```json
// vercel.json
{
  "version": 2,
  "framework": "nextjs",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/admin/:path*",
      "destination": "/admin/:path*"
    },
    {
      "source": "/chat/:path*",
      "destination": "/chat/:path*"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        }
      ]
    }
  ]
}
```

### Build Process

```bash
# Build command sequence
npm install
npm run build
npm run db:migrate
npm run test:integration
```

## Performance Optimization

### Code Splitting Strategy

```
Landing Page (Public)     : 150KB gzipped
User Dashboard           : 200KB gzipped
Admin Panel             : 300KB gzipped
Chat Interface          : 250KB gzipped
```

### Caching Strategy

```typescript
// Cache layers
1. Browser Cache (static assets): 1 year
2. CDN Cache (images, fonts): 6 months
3. API Cache (Redis): 1 hour
4. Database Query Cache: 15 minutes
5. Real-time Data: No cache
```

## Monitoring & Analytics

### Error Tracking

```typescript
// Sentry configuration
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    // Filter sensitive data
    return event;
  }
});
```

### Performance Monitoring

```typescript
// Custom metrics
export const trackUserAction = (action: string, user: UnifiedUser) => {
  analytics.track({
    event: action,
    userId: user.id,
    properties: {
      role: user.role,
      timestamp: new Date().toISOString()
    }
  });
};
```

This technical specification provides the complete architecture for implementing the dual login system and migrating mxn-chat functionality into the unified MagicWRX platform.
