"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const errorMessages: Record<string, string> = {
  Callback: "Error in authentication callback. Please try again.",
  OAuthSignin: "Error connecting to Google. Please try again.",
  OAuthCallback: "Error in OAuth callback. Please try again.",
  OAuthCreateAccount: "Could not create user account. Please try again.",
  EmailCreateAccount: "Could not create user with email. Please try again.",
  Callback: "Error in callback. Please try again.",
  OAuthAccountNotLinked:
    "Email is already linked with another account. Please try again.",
  EmailSignInError: "Invalid email or password. Please try again.",
  SessionCallback: "Session error. Please sign in again.",
  Default: "An error occurred. Please try again.",
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  const message = errorMessages[error] || errorMessages.Default;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold">Authentication Error</h1>
        </div>

        <div className="rounded-lg bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{message}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/auth/signin"
            className="rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-border px-4 py-2 text-center font-medium hover:bg-muted transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
