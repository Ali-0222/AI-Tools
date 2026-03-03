import { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Login",
  description: "Login to access your saved CV templates and profile.",
  path: "/auth/login",
  noIndex: true
});

export default function LoginPage() {
  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Login</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Sign in with email or use the Google option to open your saved CV templates.
        </p>
      </div>
      <div className="mt-8">
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
