import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to DisplayOS</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          HICC Lekki Display Team Portal
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/auth/signin"
            className="rounded-md bg-primary px-6 py-2 text-primary-foreground hover:opacity-90"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
