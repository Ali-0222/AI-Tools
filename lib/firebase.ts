import { initializeApp, getApps, getApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const requiredAuthConfigKeys: Array<keyof typeof firebaseConfig> = [
  "apiKey",
  "authDomain",
  "projectId",
  "appId"
];

function hasValue(value: string | undefined) {
  return typeof value === "string" && value.trim().length > 0;
}

export function getMissingFirebaseConfigKeys() {
  return requiredAuthConfigKeys.filter((key) => !hasValue(firebaseConfig[key]));
}

export function hasFirebaseConfig() {
  return getMissingFirebaseConfigKeys().length === 0;
}

export function getFirebaseApp() {
  if (!hasFirebaseConfig()) {
    throw new Error("Firebase environment variables are missing.");
  }

  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export async function getFirebaseAuth() {
  const auth = getAuth(getFirebaseApp());
  await setPersistence(auth, browserLocalPersistence);
  return auth;
}

export function getGoogleProvider() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
}

export function getFirebaseDb() {
  return getFirestore(getFirebaseApp());
}
