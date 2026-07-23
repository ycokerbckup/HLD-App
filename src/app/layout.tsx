import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "DisplayOS - HICC Lekki Display Team Portal",
  description: "Modern web application for the HICC Lekki Display Team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
