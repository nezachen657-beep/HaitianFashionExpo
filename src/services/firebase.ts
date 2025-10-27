// Firebase Web SDK Configuration (reads values from environment variables when available)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Read environment variables (set these in EAS, GitHub Secrets, or a local .env file during development)
const env = process.env as { [key: string]: string | undefined };

const firebaseConfig = {
  apiKey: env.EXPO_FIREBASE_API_KEY || "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: env.EXPO_FIREBASE_AUTH_DOMAIN || "haitian-fashion-app.firebaseapp.com",
  projectId: env.EXPO_FIREBASE_PROJECT_ID || "haitian-fashion-app",
  storageBucket: env.EXPO_FIREBASE_STORAGE_BUCKET || "haitian-fashion-app.appspot.com",
  messagingSenderId: env.EXPO_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: env.EXPO_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890",
  databaseURL: env.EXPO_FIREBASE_DATABASE_URL || "https://haitian-fashion-app-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

export default app;
