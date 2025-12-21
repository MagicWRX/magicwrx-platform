# User Registration & Website Creation Implementation Guide

**Created:** December 20, 2025  
**Status:** Ready for Testing  
**Purpose:** Complete guide for implementing user registration and site provisioning in MagicWRX

---

## 📋 Overview

This implementation enables users to:
1. Register for a MagicWRX account
2. Provide business information
3. Select a website template
4. Automatically provision their first website
5. Manage multiple websites from their dashboard

All new websites are based on the `base-template` structure and are fully customizable.

---

## 🗄️ Database Schema

### Files Created

**Migration File:** `/supabase/migrations/001_create_sites_tables.sql`

### Tables Created

1. **user_profiles** - Extended user profile information
   - `id` (UUID) - References auth.users
   - `role` (TEXT) - 'user' or 'admin'
   - `display_name`, `avatar_url`
   - `company_name`, `industry`, `website`
   - `subscription_tier` - 'free', 'starter', 'pro', 'enterprise'
   - `sites_limit` - Number of sites user can create
   - `storage_limit_mb`, `bandwidth_limit_gb`

2. **sites** - User website records
   - `id` (UUID) - Primary key
   - `owner_id` (UUID) - References auth.users
   - `title`, `description`, `domain`
   - `template_id` - Base template type
   - `is_published` - Publish status
   - `theme_config` (JSONB) - Colors, fonts, branding
   - `seo_config` (JSONB) - SEO metadata
   - `analytics_config` (JSONB) - Analytics IDs

3. **pages** - Site page content
   - `id` (UUID) - Primary key
   - `site_id` (UUID) - References sites
   - `slug` - Page URL path
   - `title`, `body` (JSONB)
   - `is_published` - Publish status
   - `meta` (JSONB) - Page-specific SEO

4. **site_analytics** - Site statistics
   - `id` (UUID) - Primary key
   - `site_id` (UUID) - References sites
   - `page_views`, `unique_visitors`
   - `analytics_data` (JSONB)

### Key Features

- **Row Level Security (RLS)** on all tables
- **Automatic triggers** for user profile creation
- **Site creation limits** based on subscription tier
- **Cascade deletes** when user or site is deleted
- **Indexes** for performance optimization

---

## 🔧 Services Created

### Site Provisioning Service

**File:** `/src/lib/services/site-provisioning.ts`

#### Functions

```typescript
// Create a new site
createSite(config: SiteConfig): Promise<{ site: Site | null; error: Error | null }>

// Get all user sites
getUserSites(): Promise<{ sites: Site[]; error: Error | null }>

// Get single site
getSite(siteId: string): Promise<{ site: Site | null; error: Error | null }>

// Update site
updateSite(siteId: string, updates: Partial<Site>)

// Publish/unpublish site
publishSite(siteId: string)
unpublishSite(siteId: string)

// Delete site
deleteSite(siteId: string)

// Get site analytics
getSiteAnalytics(siteId: string)
```

#### Features

- **Template-based provisioning** - Creates default pages based on template
- **Subdomain generation** - Automatic `username-xxxx.magicwrx.com` domains
- **Limit enforcement** - Checks subscription tier limits before creation
- **Default content** - Pre-populated pages for each template type

### Available Templates

1. **base-template** - Clean starting point with header/footer
2. **business** - Home, About, Services, Contact pages
3. **portfolio** - Project showcase with gallery
4. **blog** - Blog post list and article pages
5. **ecommerce** - Product catalog and cart (coming soon)

---

## 🎨 User Interface Components

### 1. Onboarding Flow

**File:** `/src/app/onboarding/page.tsx`

**Features:**
- Multi-step registration process
- Google OAuth integration
- Business information collection
- Template selection with previews
- Automatic site creation on completion

**Steps:**
1. **Account** - Name, email, password (or Google OAuth)
2. **Business** - Company name, industry, existing website
3. **Template** - Choose starting template, name your site
4. **Complete** - Success message, redirect to dashboard

### 2. Enhanced Dashboard

**File:** `/src/app/dashboard/enhanced-page.tsx`

**Features:**
- Site overview statistics
- Site management cards (edit, publish, delete)
- Quick actions (help, templates, support)
- Subscription tier display
- Create new site button (respects limits)

**Actions:**
- Edit site → Opens site builder
- View site → Opens published site in new tab
- Publish/Unpublish → Toggle site visibility
- Settings → Site configuration
- Delete → Remove site (with confirmation)

### 3. Create Site Page

**File:** Already exists at `/src/app/sites/new/page.tsx`

**Enhanced with:**
- Template selection
- Site name input
- Uses provisioning service
- Redirects to builder on success

---

## 🚀 Deployment Steps

### Step 1: Run Database Migration

```bash
cd /Users/brianlindahl/Development/Business/Websites/MagicWRX

# Connect to your Supabase project
# Option A: Via Supabase Dashboard
# 1. Go to https://supabase.com/dashboard
# 2. Select your project
# 3. Go to SQL Editor
# 4. Copy and paste content from:
#    supabase/migrations/001_create_sites_tables.sql
# 5. Click "Run"

# Option B: Via Supabase CLI (if installed)
npx supabase db push
```

### Step 2: Update Routes

Replace `/src/app/dashboard/page.tsx` with the enhanced version:

```bash
cd src/app/dashboard
mv page.tsx page.backup.tsx
mv enhanced-page.tsx page.tsx
```

### Step 3: Update Registration Flow

Update the main account creation to redirect to onboarding:

```typescript
// In /src/app/create-account/page.tsx or update links
// Change redirect from /dashboard to /onboarding
router.push('/onboarding')
```

Or set up routes:
- `/create-account` → Simple account creation
- `/onboarding` → Full onboarding flow (recommended)

### Step 4: Environment Variables

Ensure these are set in your `.env.local` and Vercel:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: For OAuth callback
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # or your production domain
```

### Step 5: Test Locally

```bash
# Install dependencies if needed
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000/onboarding
```

---

## 🧪 Testing Checklist

### User Registration Flow

- [ ] Create account with email/password
- [ ] Create account with Google OAuth
- [ ] Profile creation triggers automatically
- [ ] Business information saves correctly
- [ ] Template selection works
- [ ] First site created successfully
- [ ] Redirect to dashboard after completion

### Site Management

- [ ] Dashboard shows user's sites
- [ ] Create new site (within limits)
- [ ] Cannot exceed site limit
- [ ] Edit site redirects to builder
- [ ] Publish site makes it live
- [ ] Unpublish site makes it draft
- [ ] Delete site removes all pages
- [ ] Site analytics display correctly

### Subscription Limits

- [ ] Free tier: 1 site limit enforced
- [ ] Starter tier: 3 sites limit enforced
- [ ] Pro tier: 10 sites limit enforced
- [ ] Enterprise tier: Unlimited sites
- [ ] "Upgrade" prompt shows when at limit

### Templates

- [ ] base-template creates home page
- [ ] business creates 4 pages
- [ ] portfolio creates 2 pages
- [ ] blog creates 1 page
- [ ] ecommerce creates 2 pages
- [ ] Default content renders correctly

### Security

- [ ] RLS prevents viewing other users' sites
- [ ] RLS prevents editing other users' sites
- [ ] RLS prevents deleting other users' sites
- [ ] Published sites viewable without auth
- [ ] Draft sites require authentication

---

## 📊 Subscription Tier Configuration

### Default Limits

| Tier | Sites | Storage | Bandwidth | Monthly Cost |
|------|-------|---------|-----------|--------------|
| Free | 1 | 100 MB | 10 GB | $0 |
| Starter | 3 | 1 GB | 50 GB | $29 |
| Pro | 10 | 10 GB | 500 GB | $79 |
| Enterprise | Unlimited | 100 GB | Unlimited | $199 |

### Updating Limits

To change a user's subscription tier:

```sql
-- In Supabase SQL Editor
UPDATE user_profiles
SET 
  subscription_tier = 'pro',
  sites_limit = 10,
  storage_limit_mb = 10240,
  bandwidth_limit_gb = 500
WHERE id = 'user-uuid-here';
```

---

## 🔄 Workflow Diagram

```
User Registration Flow:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1. /onboarding                                            │
│     ├─> Enter account details                             │
│     ├─> OR Google OAuth                                   │
│     └─> Supabase Auth creates user                        │
│                                                             │
│  2. Trigger: on_auth_user_created_profile                 │
│     └─> Creates user_profiles record                      │
│                                                             │
│  3. Business information                                    │
│     └─> Updates user_profiles with company data           │
│                                                             │
│  4. Template selection                                      │
│     └─> Calls createSite() from provisioning service      │
│                                                             │
│  5. createSite() process                                   │
│     ├─> Check site limit                                  │
│     ├─> Generate subdomain                                │
│     ├─> Create site record                                │
│     ├─> Create default pages                              │
│     └─> Create analytics record                           │
│                                                             │
│  6. Redirect to /dashboard                                 │
│     └─> Display site management interface                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### Issue: Profile not created after signup

**Solution:**
```sql
-- Check if trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created_profile';

-- Manually create profile if needed
INSERT INTO user_profiles (id, display_name)
VALUES ('user-uuid', 'User Name')
ON CONFLICT (id) DO NOTHING;
```

### Issue: Cannot create site (limit reached)

**Solution:**
```sql
-- Check user's current limit
SELECT sites_limit FROM user_profiles WHERE id = 'user-uuid';

-- Count user's sites
SELECT COUNT(*) FROM sites WHERE owner_id = 'user-uuid';

-- Update limit if needed
UPDATE user_profiles SET sites_limit = 5 WHERE id = 'user-uuid';
```

### Issue: Site not publishing

**Solution:**
```typescript
// Check RLS policies
// Ensure user owns the site
const { data: site } = await supabase
  .from('sites')
  .select('*')
  .eq('id', siteId)
  .eq('owner_id', userId)
  .single()

// If site exists, publish should work
await publishSite(siteId)
```

### Issue: Pages not created

**Solution:**
```sql
-- Check if pages exist for site
SELECT * FROM pages WHERE site_id = 'site-uuid';

-- Manually create home page if needed
INSERT INTO pages (site_id, slug, title, body, is_published)
VALUES (
  'site-uuid',
  '/',
  'Home',
  '{"components": [], "layout": "default"}'::jsonb,
  true
);
```

---

## 📚 Next Steps

### Immediate (This Sprint)
- [ ] Run database migration in production
- [ ] Deploy updated dashboard
- [ ] Test complete registration flow
- [ ] Update homepage to link to /onboarding
- [ ] Add analytics tracking

### Short-term (Next 2 Weeks)
- [ ] Build site builder interface
- [ ] Implement theme customization
- [ ] Add custom domain support
- [ ] Create site settings page
- [ ] Implement page editor

### Medium-term (Next Month)
- [ ] Add more templates
- [ ] Implement Stripe billing
- [ ] Create admin dashboard for user management
- [ ] Add site preview feature
- [ ] Build SEO configuration interface

### Long-term (Q1 2026)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Marketplace for templates
- [ ] White-label options
- [ ] API for programmatic site management

---

## 📖 Related Documentation

- [MAGICWRX_ROADMAP.md](../../../../DOCs/MAGICWRX/MAGICWRX_ROADMAP.md) - Product roadmap
- [MAGICWRX_EXECUTIVE_V2.md](../../../../DOCs/MAGICWRX/MAGICWRX_EXECUTIVE_V2.md) - Architecture decisions
- [base-template README](../../../base-template/README.md) - Template structure

---

## ✅ Success Metrics

When implementation is successful, users should be able to:

1. ✅ Register in under 2 minutes
2. ✅ Have their first site live within 5 minutes
3. ✅ Access and manage all sites from dashboard
4. ✅ Publish/unpublish with one click
5. ✅ See clear subscription limits and upgrade paths

---

**Implementation Status:** ✅ Complete - Ready for Testing  
**Last Updated:** December 20, 2025  
**Version:** 1.0.0
