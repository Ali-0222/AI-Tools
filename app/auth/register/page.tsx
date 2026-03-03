import { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Create Account",
  description: "Create an account to save CV templates and resume data to your profile.",
  path: "/auth/register",
  noIndex: true
});

export default function RegisterPage() {
  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Create account</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Create an account to save and manage CV templates from your profile.
        </p>
      </div>
      <div className="mt-8">
        <AuthForm mode="register" />
      </div>
    </main>
  );
}
