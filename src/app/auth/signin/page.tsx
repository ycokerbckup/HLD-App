import { SignInButton } from "@/features/auth/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">DisplayOS</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            HICC Lekki Display Team Portal
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-foreground">
            Sign in to access the team portal
          </p>
          <SignInButton />
        </div>

        <div className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>Authorized members only</p>
        </div>
      </div>
    </div>
  );
}
