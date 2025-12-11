// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, Firestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator, FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "magic-wrx.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "magic-wrx",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "magic-wrx.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "24629615626",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:24629615626:web:f9d4d0fac5f709b996d3f3",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-RJEJT2JT5T"
};

// Check if Firebase config is valid
const isConfigValid = () => {
  return firebaseConfig.apiKey && 
         firebaseConfig.authDomain && 
         firebaseConfig.projectId &&
         firebaseConfig.apiKey !== "AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4" &&
         firebaseConfig.authDomain !== "magic-wrx.firebaseapp.com";
};

// Initialize Firebase
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Connect to emulators in development
  const useEmulators = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';
  
  if (useEmulators && typeof window !== 'undefined') {
    try {
      // Simple emulator connection without checking existing connections
      // Note: Multiple connections to the same emulator will show warnings but won't break functionality
      connectAuthEmulator(auth, process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL || "http://localhost:9099", { 
        disableWarnings: true 
      });
      
      const [firestoreHost, firestorePort] = (process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_URL || "localhost:8080").split(':');
      connectFirestoreEmulator(db, firestoreHost, parseInt(firestorePort));
      
      const [storageHost, storagePort] = (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_URL || "localhost:9199").split(':');
      connectStorageEmulator(storage, storageHost, parseInt(storagePort));
      
      console.log("🔧 Firebase emulators connected successfully");
    } catch (error: any) {
      // Ignore "already connected" errors as they're harmless
      if (!error.message?.includes('already')) {
        console.warn("Failed to connect to Firebase emulators:", error);
      } else {
        console.log("🔧 Firebase emulators already connected");
      }
    }
  }

  // Initialize Analytics (only in browser environment)
  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
  }

  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization failed:", error);
  
  // Provide fallback or demo mode
  if (!isConfigValid()) {
    console.warn("Invalid Firebase configuration detected. Running in demo mode.");
  }
}

// Export a function to check Firebase status
export const isFirebaseConfigured = () => {
  return !!app && isConfigValid();
};

// Export Firebase error handler
export const handleFirebaseError = (error: any) => {
  console.error("Firebase error:", error);
  
  switch (error.code) {
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many requests. Please try again later.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
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
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Popup blocked. Please allow popups for this site.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized. Please add it to your Firebase project settings.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};

// Export with fallback for null values
export { auth, db, storage, analytics };
export default app;
