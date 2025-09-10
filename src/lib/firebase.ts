import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCtebjkQ1Qhukos4Mn3mr9wcV-Lq4CRPnM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dependable-keep-466315-t8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dependable-keep-466315-t8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dependable-keep-466315-t8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "792418136841",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:792418136841:web:9edcff7a6e91e0944e99d8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-JEF68PD9QG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export default app;