# MagicWRX Authentication System

## Overview

MagicWRX includes a comprehensive authentication system with Google OAuth login, email/password authentication, and demo mode fallback.

## Features

✅ **Google OAuth Login** - Sign in with Google account  
✅ **Email/Password Login** - Traditional authentication  
✅ **User State Management** - Real-time auth state tracking  
✅ **Error Handling** - Comprehensive error messages  
✅ **Demo Mode** - Fallback for testing  
✅ **Responsive UI** - Works on all devices  
✅ **Firebase Integration** - Secure backend authentication  

## Quick Start

### 1. Setup Authentication
```bash
./auth-setup.sh
```

### 2. Test Authentication
```bash
./auth-test.sh
```

### 3. Start Development Server
```bash
npm run dev
```

## Authentication Pages

### Login Page (`/login`)
- Email/password login
- Google OAuth login
- Error handling and validation
- Remember me functionality
- Forgot password link

### Signup Page (`/signup`)
- Email/password registration
- Google OAuth signup
- Password confirmation
- Terms of service agreement
- Email validation

### Demo Login (`/demo-login`)
- Demo mode for testing
- No Firebase required
- Simulated authentication flow

## Firebase Configuration

### Required Setup

1. **Enable Authentication Providers:**
   - Go to [Firebase Console](https://console.firebase.google.com/project/magic-wrx/authentication)
   - Click "Get started" or "Sign-in method"
   - Enable "Email/Password"
   - Enable "Google"

2. **Configure Google Provider:**
   - Click "Google" in the providers list
   - Toggle "Enable"
   - Add support email
   - Save configuration

3. **Add Authorized Domains:**
   - Go to "Settings" tab
   - Add `localhost` for development
   - Add `magic-wrx.web.app` for production

### Firebase Configuration File

The authentication is configured in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4",
  authDomain: "magic-wrx.firebaseapp.com",
  projectId: "magic-wrx",
  storageBucket: "magic-wrx.firebasestorage.app",
  messagingSenderId: "24629615626",
  appId: "1:24629615626:web:f9d4d0fac5f709b996d3f3",
  measurementId: "G-RJEJT2JT5T"
};
```

## Scripts Overview

### Authentication Scripts

| Script | Purpose |
|--------|---------|
| `auth-setup.sh` | Configure authentication providers |
| `auth-test.sh` | Test authentication functionality |
| `firebase-switch.sh` | Switch between Firebase accounts |
| `firebase-status.sh` | Check Firebase configuration |

### Deployment Scripts

| Script | Purpose |
|--------|---------|
| `deploy.sh` | Deploy to Firebase Hosting |
| `start-dev.sh` | Start development server |
| `start-emulators.sh` | Start Firebase emulators |

## Usage Examples

### Google Login Implementation

```typescript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider()
    provider.addScope('email')
    provider.addScope('profile')
    
    await signInWithPopup(auth, provider)
    // Redirect to dashboard
  } catch (error) {
    console.error('Google login error:', error)
  }
}
```

### User State Management

```typescript
import { useAuthState } from '@/hooks/useAuth'

function MyComponent() {
  const { user, loading, error } = useAuthState()
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>Please log in</div>
  
  return <div>Welcome, {user.email}!</div>
}
```

## Error Handling

The system includes comprehensive error handling for common authentication issues:

- Network errors
- Invalid credentials
- Account disabled
- Email already in use
- Weak passwords
- Popup blocked
- Unauthorized domains

## Security Features

- ✅ **HTTPS Only** - All production traffic is encrypted
- ✅ **Domain Validation** - Only authorized domains can authenticate
- ✅ **Password Requirements** - Minimum 6 characters
- ✅ **Account Lockout** - Protection against brute force
- ✅ **Session Management** - Secure token handling

## Testing

### Manual Testing

1. **Development Testing:**
   ```bash
   npm run dev
   # Visit http://localhost:3000/login
   ```

2. **Production Testing:**
   - Visit https://magic-wrx.web.app/login
   - Test both email/password and Google login

### Automated Testing

```bash
./auth-test.sh
```

This script will:
- Check if development server is running
- Test authentication pages accessibility
- Verify Firebase configuration
- Validate Google Auth provider setup

## Troubleshooting

### Common Issues

1. **"popup-closed-by-user" Error**
   - Solution: Allow popups in browser settings
   - Try again with popup enabled

2. **"auth/unauthorized-domain" Error**
   - Solution: Add domain to Firebase Auth settings
   - Add `localhost` for development
   - Add production domain for live site

3. **"400 Bad Request" Error**
   - Solution: Enable Authentication in Firebase Console
   - Enable Firestore if using database features

4. **Google Login Not Working**
   - Check if Google provider is enabled in Firebase Console
   - Verify authorized domains are set correctly
   - Check browser console for errors

### Debug Mode

Enable debug logging by adding to your environment:

```bash
export NEXT_PUBLIC_DEBUG_AUTH=true
```

## API Reference

### Authentication Hook

```typescript
const { user, loading, error, isConfigured } = useAuthState()
```

**Returns:**
- `user`: Firebase User object or null
- `loading`: Boolean indicating loading state
- `error`: Error message string or null
- `isConfigured`: Boolean indicating Firebase configuration status

### Firebase Functions

```typescript
import { auth, handleFirebaseError, isFirebaseConfigured } from '@/lib/firebase'
```

**Functions:**
- `auth`: Firebase Auth instance
- `handleFirebaseError(error)`: Returns user-friendly error message
- `isFirebaseConfigured()`: Returns boolean for config status

## Deployment

### Production Deployment

```bash
./deploy.sh
```

This will:
- Check Firebase authentication
- Build the project
- Deploy to Firebase Hosting
- Provide authentication URLs

### Environment Variables

For production, consider using environment variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

## Support

For authentication issues:

1. **Check Setup Guide:** `/setup-guide`
2. **View Troubleshooting:** `/troubleshooting`
3. **Test Demo Mode:** `/demo-login`
4. **Review Firebase Console:** https://console.firebase.google.com/project/magic-wrx

---

**Last Updated:** $(date)
**Version:** 1.0.0 