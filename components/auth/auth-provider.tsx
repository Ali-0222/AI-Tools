"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { getFirebaseAuth, getGoogleProvider, hasFirebaseConfig } from "@/lib/firebase";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  provider: "email" | "google";
};

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  configured: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function mapUser(user: User): AuthUser {
  const providerId = user.providerData[0]?.providerId;
  return {
    id: user.uid,
    name: user.displayName || user.email?.split("@")[0] || "User",
    email: user.email || "",
    provider: providerId === "google.com" ? "google" : "email"
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const configured = hasFirebaseConfig();

  useEffect(() => {
    if (!configured) {
      setReady(true);
      return;
    }

    let unsubscribe = () => undefined;

    void (async () => {
      const auth = await getFirebaseAuth();
      unsubscribe = onAuthStateChanged(auth, (nextUser) => {
        setUser(nextUser ? mapUser(nextUser) : null);
        setReady(true);
      });
    })();

    return () => unsubscribe();
  }, [configured]);

  async function loginWithEmail(email: string, password: string) {
    if (!configured) {
      throw new Error("Firebase auth is not configured.");
    }
    const auth = await getFirebaseAuth();
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    if (!configured) {
      throw new Error("Firebase auth is not configured.");
    }
    const auth = await getFirebaseAuth();
    await signInWithPopup(auth, getGoogleProvider());
  }

  async function registerWithEmail(name: string, email: string, password: string) {
    if (!configured) {
      throw new Error("Firebase auth is not configured.");
    }
    const auth = await getFirebaseAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    setUser({
      id: result.user.uid,
      name,
      email: result.user.email || email,
      provider: "email"
    });
  }

  async function logout() {
    if (!configured) {
      setUser(null);
      return;
    }
    const auth = await getFirebaseAuth();
    await signOut(auth);
  }

  async function requestPasswordReset(email: string) {
    if (!configured) {
      throw new Error("Firebase auth is not configured.");
    }
    const auth = await getFirebaseAuth();
    await sendPasswordResetEmail(auth, email);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        configured,
        loginWithEmail,
        loginWithGoogle,
        registerWithEmail,
        logout,
        requestPasswordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
