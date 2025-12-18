# Supabase Migration Guide

This guide outlines the steps to complete the migration from Firebase to Supabase for the Magic WRX project.

## 1. Project Setup

1.  **Create a Supabase Project**:
    *   Go to [Supabase Dashboard](https://supabase.com/dashboard).
    *   Create a new project.
    *   Note your `Project URL` and `anon public key`.

2.  **Environment Variables**:
    *   Update your `.env.local` file with the following keys:
        ```env
        NEXT_PUBLIC_SUPABASE_URL=your_project_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
        ```
    *   Add these variables to your Vercel project settings as well.

3.  **Authentication Settings**:
    *   In the Supabase Dashboard, go to **Authentication** -> **Providers**.
    *   Enable **Email/Password**.
    *   Enable **Google** (if used). You will need to configure the Client ID and Secret from your Google Cloud Console.
    *   **Redirect URLs**: Add your production and development URLs:
        *   `http://localhost:3000/auth/callback`
        *   `https://your-domain.com/auth/callback`

## 2. Database Schema

We have prepared a SQL schema to set up the necessary tables and security policies.

1.  Go to the **SQL Editor** in your Supabase Dashboard.
2.  Copy the contents of `supabase/schema.sql` from this project.
3.  Paste it into the SQL Editor and run it.

This will:
*   Create a `profiles` table linked to `auth.users`.
*   Set up Row Level Security (RLS) policies.
*   Create a trigger to automatically create a profile entry when a new user signs up.
*   Set up a storage bucket for avatars.

## 3. Code Migration Status

*   **Authentication**:
    *   `src/lib/supabase/client.ts`: Browser client initialized.
    *   `src/lib/supabase/server.ts`: Server client initialized (for Server Components/Actions).
    *   `src/lib/supabase/middleware.ts`: Middleware for session management.
    *   `src/hooks/useSupabaseAuth.ts`: React hook replacing `useAuth`.
    *   `src/app/login/page.tsx`: Updated to use Supabase Auth.
    *   `src/app/signup/page.tsx`: Updated to use Supabase Auth.
    *   `src/components/Header.tsx`: Updated to use `useSupabaseAuth`.
    *   `src/app/admin/page.tsx`: Updated to use `useSupabaseAuth`.
    *   `src/app/troubleshooting/page.tsx`: Updated with Supabase troubleshooting steps.

*   **Middleware**:
    *   `src/middleware.ts`: Updated to refresh Supabase sessions.

## 4. Cleanup (To Do)

Once you have verified that Supabase is working correctly, you can remove the Firebase dependencies and files.

1.  **Uninstall Firebase**:
    ```bash
    npm uninstall firebase
    ```

2.  **Remove Firebase Files**:
    *   `src/lib/firebase.ts`
    *   `src/hooks/useAuth.ts`
    *   `src/components/FirebaseStatus.tsx`
    *   `firebase.json`
    *   `firestore.rules`
    *   `firestore.indexes.json`
    *   `storage.rules`
    *   `firebase-status.sh`
    *   `firebase-switch.sh`
    *   `import-firebase-env.sh`

## 5. Verification

1.  Start the development server: `npm run dev`.
2.  Visit `/signup` and create a new account.
3.  Check the Supabase Dashboard -> Authentication to see the new user.
4.  Check the Supabase Dashboard -> Table Editor -> `profiles` to see the new profile entry.
5.  Try logging out and logging back in.
6.  Visit `/admin` to verify protected route access.

## 6. Troubleshooting

If you encounter issues, check the `/troubleshooting` page in the application or refer to the Supabase logs in the dashboard.
