# Google Sign-in Implementation Checklist - Firebase Error Resolution

## 🚨 **Current Errors**
- `Firebase: Error (auth/firebase-app-check-token-is-invalid.)`
- `Firebase: Error (auth/internal-error)`

These errors indicate Firebase App Check and configuration issues.

## 📋 **Diagnostic Checklist**

### **Step 1: Verify Firebase Configuration**

#### 1.1 Check Environment Variables
```bash
# In MagicWRX/.env.local - verify these exist and are correct:
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=magic-wrx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=magic-wrx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=magic-wrx.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=24629615626
NEXT_PUBLIC_FIREBASE_APP_ID=1:24629615626:web:f9d4d0fac5f709b996d3f3
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-RJEJT2JT5T
```

#### 1.2 Check Firebase Project Status
```bash
# Action Items:
□ Verify project ID matches: magic-wrx
□ Confirm project is active (not deleted/suspended)
□ Check billing status (make sure not over quota)
□ Verify API keys are not rotated/expired
```

### **Step 2: Firebase Console Settings**

#### 2.1 Authentication Configuration
```bash
# Firebase Console → Authentication → Sign-in method
□ Email/Password: Enabled
□ Google: Enabled with proper OAuth client
□ Authorized domains include:
  - localhost
  - magic-wrx.vercel.app (or your Vercel domain)
  - magic-wrx.firebaseapp.com
```

#### 2.2 OAuth Consent Screen (Google Cloud Console)
```bash
# Google Cloud Console → APIs & Services → OAuth consent screen
□ App name: MagicWRX
□ User support email: Set to your email
□ Developer contact: Set to your email
□ Scopes include: email, profile, openid
□ Test users: Add your email addresses
□ Publishing status: In production OR add test users
```

#### 2.3 OAuth Client IDs
```bash
# Google Cloud Console → APIs & Services → Credentials
□ Web application OAuth 2.0 client exists
□ Authorized JavaScript origins:
  - http://localhost:3000
  - https://magic-wrx.vercel.app
  - https://magic-wrx.firebaseapp.com
□ Authorized redirect URIs:
  - http://localhost:3000/__/auth/handler
  - https://magic-wrx.vercel.app/__/auth/handler
  - https://magic-wrx.firebaseapp.com/__/auth/handler
```

### **Step 3: App Check Configuration (Primary Issue)**

#### 3.1 Disable App Check (Temporary Fix)
```bash
# Firebase Console → App Check
□ Check if App Check is enabled
□ If enabled, either:
  - Add reCAPTCHA provider for web
  - OR temporarily disable App Check for testing
□ For localhost development: Add debug token
```

#### 3.2 Debug Token Setup
```bash
# If App Check is required, get debug token:
# 1. Open browser console on localhost:3000
# 2. Run: firebase.appCheck().getToken(true)
# 3. Copy the debug token
# 4. Add to Firebase Console → App Check → Debug tokens
```

### **Step 4: Code Verification**

#### 4.1 Check Firebase Initialization
```typescript
// src/lib/firebase.ts should have:
□ Proper firebaseConfig object
□ initializeApp(firebaseConfig) called
□ getAuth(app) properly initialized
□ No App Check initialization (unless configured)
```

#### 4.2 Google Auth Implementation
```typescript
// In login/create-account components:
□ GoogleAuthProvider imported correctly
□ signInWithPopup used (not signInWithRedirect for localhost)
□ Proper error handling for popup blockers
□ No conflicting auth calls
```

## 🔧 **Quick Fixes to Try**

### **Fix 1: Disable App Check Temporarily**
```bash
# Firebase Console → App Check → Settings
# Toggle OFF "Enforce App Check token for all project APIs"
# This should immediately resolve auth/firebase-app-check-token-is-invalid
```

### **Fix 2: Update Firebase Config**
```typescript
// In src/lib/firebase.ts, ensure this structure:
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your config here - NO quotes around values
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... rest of config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### **Fix 3: Check for Popup Blockers**
```typescript
// Update Google sign-in to handle popup issues:
const handleGoogleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const result = await signInWithPopup(auth, provider);
    // Handle success
  } catch (error) {
    if (error.code === 'auth/popup-blocked') {
      // Fallback to redirect
      await signInWithRedirect(auth, provider);
    }
    console.error('Google sign-in error:', error);
  }
};
```

## 🧪 **Testing Steps**

### **Test 1: Basic Firebase Connection**
```bash
# Open browser console on localhost:3000
# Run these commands:
console.log(window.firebase); // Should show Firebase object
console.log(auth.currentUser); // Should show null or user
```

### **Test 2: Manual Auth Test**
```bash
# In browser console:
import { signInWithEmailAndPassword } from 'firebase/auth';
// Try basic email auth first (no Google)
```

### **Test 3: Network Tab Analysis**
```bash
# Open DevTools → Network tab
# Try Google sign-in
# Look for:
□ Failed requests to googleapis.com
□ CORS errors
□ 400/401/403 errors
□ App Check token errors
```

## 📞 **Compare with mxn-chat Working Implementation**

### **Reference Check**
```bash
# Compare working mxn-chat implementation:
# Check: /Users/brianlindahl/Development/Business/Websites/mxn-chat/src/lib/firebase.ts
# Look for differences in:
□ Firebase config structure
□ App Check settings
□ Environment variables
□ OAuth provider setup
```

## 🎯 **Most Likely Solutions**

### **Primary Fix (90% probability):**
```bash
1. Firebase Console → App Check → Disable enforcement
2. Or add localhost debug token to App Check
```

### **Secondary Fix:**
```bash
1. Google Cloud Console → OAuth consent screen
2. Add your email as test user
3. Verify authorized domains
```

### **Tertiary Fix:**
```bash
1. Check Firebase project billing status
2. Verify API quotas not exceeded
3. Regenerate OAuth client if needed
```

## ✅ **Success Indicators**

You'll know it's fixed when:
- ✅ No `auth/firebase-app-check-token-is-invalid` errors
- ✅ Google sign-in popup opens properly
- ✅ Can complete OAuth flow without internal errors
- ✅ User gets redirected to dashboard after sign-in

Let me know which specific step reveals the issue and I'll help dig deeper!
