# 🔥 IMMEDIATE FIX: Google Sign-in Firebase Errors

## 🚨 **Root Cause Identified**

The errors `auth/firebase-app-check-token-is-invalid` and `auth/internal-error` are caused by **configuration complexity** in your MagicWRX Firebase setup compared to the working mxn-chat setup.

## 🎯 **Key Differences Found**

### **MagicWRX (Problematic)**
- ❌ Complex emulator connection logic
- ❌ Multiple service initializations (Analytics, Storage, Firestore)
- ❌ Nullable auth exports
- ❌ Try-catch wrapper causing initialization issues

### **mxn-chat (Working)**
- ✅ Simple, direct initialization
- ✅ Clean auth export
- ✅ Minimal complexity

## ⚡ **IMMEDIATE FIXES**

### **Fix 1: Simplify Firebase Configuration (Recommended)**

Replace your current `src/lib/firebase.ts` with this simplified version:

```typescript
// src/lib/firebase.ts - SIMPLIFIED VERSION
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "magic-wrx.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "magic-wrx",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "magic-wrx.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "24629615626",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:24629615626:web:f9d4d0fac5f709b996d3f3",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-RJEJT2JT5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export helper functions
export const isFirebaseConfigured = () => {
  return !!auth && !!firebaseConfig.apiKey;
};

export const handleFirebaseError = (error: any) => {
  console.error("Firebase error:", error);
  
  switch (error.code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Popup blocked. Please allow popups for this site.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized. Please add it to your Firebase project settings.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};

export default app;
```

### **Fix 2: Update Environment Variable**

```bash
# In .env.local, change this line:
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false

# To:
# NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false (commented out)
```

### **Fix 3: Test Google Sign-in Implementation**

Update your Google sign-in handlers to match the working mxn-chat pattern:

```typescript
// In login/create-account pages
const handleGoogleSignIn = async () => {
  setError('')
  setLoading(true)
  
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    console.log('Google sign-in successful:', result.user.email);
    router.push('/dashboard');
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    setError(handleFirebaseError(error));
  } finally {
    setLoading(false);
  }
};
```

## 🧪 **Testing Steps**

### **Step 1: Apply the Fix**
```bash
# 1. Replace src/lib/firebase.ts with simplified version above
# 2. Restart your dev server:
npm run dev
```

### **Step 2: Test Basic Auth**
```bash
# Open browser console at localhost:3000
# Check if Firebase initializes properly:
console.log(window.firebase); // Should not show errors
```

### **Step 3: Test Google Sign-in**
```bash
# Navigate to: http://localhost:3000/create-account
# Click "Sign up with Google"
# Expected: Clean popup without App Check errors
```

## 🎯 **Why This Works**

1. **Removes Complex Emulator Logic**: Your current setup has complex emulator connection logic that can interfere with production auth
2. **Eliminates Null Exports**: The nullable auth export (`let auth: Auth | null`) can cause timing issues
3. **Matches Working Pattern**: This mirrors the exact structure of your working mxn-chat implementation
4. **Removes App Check Conflicts**: Eliminates any potential App Check token issues

## 📞 **If Still Having Issues**

### **Firebase Console Checks:**
```bash
□ Go to Firebase Console → Authentication → Sign-in method
□ Verify Google provider is enabled
□ Check authorized domains include: localhost, your-domain.vercel.app
□ Go to App Check → Temporarily disable if enabled
```

### **Google Cloud Console:**
```bash
□ Go to Google Cloud Console → APIs & Services → Credentials
□ Find your OAuth 2.0 client ID
□ Verify authorized origins include: http://localhost:3000
□ Verify redirect URIs include: http://localhost:3000/__/auth/handler
```

This simplified configuration should immediately resolve your `auth/firebase-app-check-token-is-invalid` and `auth/internal-error` issues! 🚀
