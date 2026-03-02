import { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset for your account."
};

export default function ForgotPasswordPage() {
  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Forgot password</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Enter your email address to request a password reset.
        </p>
      </div>
      <div className="mt-8">
        <AuthForm mode="forgot" />
      </div>
    </main>
  );
}
