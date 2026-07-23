"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
    >
      Sign out
    </button>
  );
}
