"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToolButton } from "@/components/tool-shared";
import { useAuth } from "@/components/auth/auth-provider";

type Mode = "login" | "register" | "forgot";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const { configured, loginWithEmail, loginWithGoogle, registerWithEmail, requestPasswordReset } =
    useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      if (mode === "login") {
        await loginWithEmail(email, password);
        router.push("/profile");
        return;
      }

      if (mode === "register") {
        await registerWithEmail(name, email, password);
        router.push("/profile");
        return;
      }

      await requestPasswordReset(email);
      setMessage(`Password reset email sent to ${email}.`);
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setMessage("");

    try {
      setLoading(true);
      await loginWithGoogle();
      router.push("/profile");
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Google login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] md:p-8">
      {!configured ? (
        <div className="mb-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 text-sm leading-6 text-[var(--muted)]">
          Firebase auth is not configured yet. Add the values from `.env.example` to your local `.env.local` file and create a Firebase project with Google and Email/Password sign-in enabled.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Full name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-[var(--border)] p-3"
              required
            />
          </label>
        ) : null}
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-[var(--border)] p-3"
            required
          />
        </label>
        {mode !== "forgot" ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-[var(--border)] p-3"
              required
            />
          </label>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <ToolButton type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : mode === "register"
                  ? "Create account"
                  : "Send reset link"}
          </ToolButton>
          {mode !== "forgot" ? (
            <ToolButton type="button" variant="secondary" onClick={handleGoogleLogin} disabled={loading}>
              Continue with Google
            </ToolButton>
          ) : null}
        </div>
      </form>

      {error ? <p className="mt-4 text-sm text-[var(--warn)]">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-[var(--accent)]">{message}</p> : null}

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
        {mode !== "login" ? <Link href="/auth/login">Login</Link> : null}
        {mode !== "register" ? <Link href="/auth/register">Create account</Link> : null}
        {mode !== "forgot" ? <Link href="/auth/forgot-password">Forgot password?</Link> : null}
      </div>
    </div>
  );
}
