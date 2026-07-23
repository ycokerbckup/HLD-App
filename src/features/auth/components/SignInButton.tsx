"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { redirect: true });
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
    >
      {isLoading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}
