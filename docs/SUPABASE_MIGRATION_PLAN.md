# MagicWRX Firebase to Supabase Migration Plan

This document outlines the step-by-step plan to migrate the MagicWRX application from Firebase to Supabase, focusing on Authentication and Database services.

## Phase 1: Infrastructure & Configuration

### 1.1 Install Dependencies
- [ ] Install Supabase client libraries:
  ```bash
  npm install @supabase/supabase-js @supabase/ssr
  ```

### 1.2 Environment Setup
- [ ] Retrieve Supabase credentials (URL, Anon Key) from Supabase Dashboard.
- [ ] Update `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-project-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```
- [ ] Add environment variables to Vercel project settings.

### 1.3 Client Initialization
- [ ] Create `src/lib/supabase/client.ts` for Client Components.
- [ ] Create `src/lib/supabase/server.ts` for Server Components/Actions.
- [ ] Create `src/lib/supabase/middleware.ts` for Session Management.

## Phase 2: Authentication Migration

### 2.1 Auth Hooks Replacement
- [ ] Create `src/hooks/useSupabaseAuth.ts` to replace `src/hooks/useAuth.ts`.
- [ ] Implement authentication methods:
  - `signInWithEmail`
  - `signUpWithEmail`
  - `signInWithOAuth` (Google)
  - `signOut`

### 2.2 Component Updates
- [ ] Update Login Page (`src/app/login/page.tsx`):
  - Replace Firebase `signInWithEmailAndPassword` with Supabase equivalent.
  - Replace Firebase Google Auth with Supabase OAuth.
- [ ] Update Signup Page (`src/app/signup/page.tsx`):
  - Replace Firebase `createUserWithEmailAndPassword` with Supabase equivalent.
- [ ] Update any other components using `useAuth` or `useAuthState`.

### 2.3 Session Management
- [ ] Create/Update `middleware.ts` to handle Supabase session refreshing.
- [ ] Ensure protected routes redirect unauthenticated users.

## Phase 3: Database & User Profiles

### 3.1 Schema Setup
- [ ] Create `profiles` table in Supabase (public schema).
  ```sql
  create table public.profiles (
    id uuid references auth.users on delete cascade not null primary key,
    email text,
    full_name text,
    avatar_url text,
    updated_at timestamp with time zone
  );
  ```
- [ ] Enable Row Level Security (RLS) on `profiles`.
- [ ] Create policies for SELECT, INSERT, UPDATE.

### 3.2 Automation
- [ ] Create a PostgreSQL trigger to automatically create a profile entry when a new user signs up via Supabase Auth.

## Phase 4: Cleanup & Verification

### 4.1 Verification
- [ ] Test User Registration (Email/Password).
- [ ] Test User Login.
- [ ] Test Google OAuth Login.
- [ ] Test Logout.
- [ ] Verify Profile creation in Database.

### 4.2 Code Cleanup
- [ ] Remove Firebase dependencies:
  ```bash
  npm uninstall firebase
  ```
- [ ] Delete Firebase configuration:
  - `src/lib/firebase.ts`
  - `firebase.json`
  - `.firebaserc`
- [ ] Archive or delete Firebase-specific scripts:
  - `auth-setup.sh`
  - `auth-test.sh`
  - `firebase-switch.sh`
