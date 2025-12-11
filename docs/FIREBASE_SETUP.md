# MagicWRX Firebase Setup Guide

## ✅ Current Status
- **Firebase Account**: MagicWRXStudio@gmail.com ✅
- **Firebase Project**: magic-wrx ✅
- **Firebase CLI**: Configured ✅
- **Emulators**: Configured ✅

## 🚀 Quick Start Options

### Option 1: Use Firebase Emulators (Recommended for Development)
```bash
# Terminal 1: Start emulators
./start-emulators.sh

# Terminal 2: Start development with emulators
export NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
npm run dev:emulator
```

### Option 2: Use Live Firebase (Production)
```bash
# Regular development (uses live Firebase)
npm run dev
```

## 🔧 Emulator Configuration

The project is configured with these emulators:
- **Authentication**: localhost:9099
- **Firestore**: localhost:8080  
- **Storage**: localhost:9199
- **Hosting**: localhost:5000
- **Emulator UI**: localhost:4000

## 📝 Environment Variables

Current `.env.local` configuration:
```bash
# Set to 'true' to use emulators, 'false' for live Firebase
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false

# Firebase project configuration (already set)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=magic-wrx
# ... other Firebase config
```

## 🏗️ Firebase Project Services Status

### Authentication
- **Status**: ✅ Configured
- **Methods**: Email/Password, Google OAuth
- **Emulator**: localhost:9099

### Firestore Database  
- **Status**: ✅ Ready
- **Rules**: Need to be configured in Firebase Console
- **Emulator**: localhost:8080

### Storage
- **Status**: ✅ Ready  
- **Rules**: Need to be configured in Firebase Console
- **Emulator**: localhost:9199

### Hosting
- **Status**: ✅ Configured
- **URL**: https://magic-wrx.web.app
- **Domain**: Can be configured later

## 🛠️ Commands Reference

```bash
# Firebase CLI
firebase login              # Login (already done)
firebase projects:list      # List projects  
firebase use magic-wrx      # Switch to magic-wrx project

# Development
npm run dev                 # Normal development
npm run dev:emulator        # Development with emulators
./start-emulators.sh        # Start Firebase emulators
./start-dev.sh             # Smart development startup

# Deployment
npm run build              # Build for production
npm run deploy             # Deploy to Firebase Hosting
./deploy.sh               # Full deployment script
```

## 🔍 Troubleshooting

### Check Current Status:
```bash
firebase projects:list     # Should show magic-wrx
firebase use              # Should show magic-wrx as active
```

### Switch Between Emulator/Production:
1. **For Emulators**: Set `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true` in `.env.local`
2. **For Production**: Set `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false` in `.env.local`

### Account Conflicts:
If you see the wrong Firebase projects, you may be logged into the wrong account:
```bash
firebase logout
firebase login
# Select MagicWRXStudio@gmail.com
```
   - Enable "Email/Password"
   - Enable "Google" (add MagicWRXStudio@gmail.com as authorized user)
   - Add authorized domains: `localhost`, `magic-wrx.web.app`, your custom domain

2. **Firestore Database**:
   - Go to Firestore Database
   - Create database in production mode
   - Choose a location close to your users

3. **Hosting**:
   - Go to Hosting
   - Get started (this will be configured via CLI)

### Step 4: Get Configuration
1. Go to Project Settings → General
2. Scroll to "Your apps" → Web apps
3. Click "Add app" if no web app exists
4. Copy the Firebase configuration object
5. Update `src/lib/firebase.ts` with the new configuration

## 2. Local Development Setup

### Update Firebase Configuration
Edit `src/lib/firebase.ts` and replace the config object:

```javascript
const firebaseConfig = {
  apiKey: "your-new-api-key",
  authDomain: "magic-wrx.firebaseapp.com",
  projectId: "magic-wrx",
  storageBucket: "magic-wrx.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

### Test Local Development
```bash
npm run dev
```
Visit http://localhost:3000 and test authentication

## 3. Deployment

### Option 1: Use the deployment script
```bash
./deploy.sh
```

### Option 2: Manual deployment
```bash
npm run build
firebase deploy
```

## 4. Post-Deployment

1. **Custom Domain** (if needed):
   - Go to Hosting → Add custom domain
   - Follow the DNS setup instructions

2. **Security Rules**:
   - Set up Firestore security rules
   - Configure Storage rules if using file uploads

3. **Monitoring**:
   - Enable error reporting
   - Set up performance monitoring

## 5. GitHub Repository

### Option A: Create new repository under MagicWRX account
1. Create repository at https://github.com/MagicWRXStudio
2. Update remote:
   ```bash
   git remote set-url origin https://github.com/MagicWRXStudio/magic-wrx.git
   ```

### Option B: Keep current repository
- Current commits will use MagicWRX identity going forward
- Previous commits will remain under the original author

## Troubleshooting

- **Authentication errors**: Check authorized domains in Firebase Console
- **Deployment errors**: Ensure you're logged into correct Firebase account
- **Build errors**: Check Next.js static export compatibility

## Support

For issues specific to MagicWRX setup, check:
- `/troubleshooting` page in the app
- Firebase Console error logs
- Browser developer tools console
