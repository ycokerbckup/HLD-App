"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Calendar,
  BookOpen,
  AlertSquare,
  MessageSquare,
  Library,
  Settings,
  LogOut,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  { label: "Members", href: "/members", icon: <Users className="w-5 h-5" /> },
  {
    label: "Announcements",
    href: "/announcements",
    icon: <Megaphone className="w-5 h-5" />,
  },
  {
    label: "Schedule",
    href: "/schedule",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    label: "Training",
    href: "/training",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: <AlertSquare className="w-5 h-5" />,
  },
  {
    label: "Feedback",
    href: "/feedback",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    label: "Resources",
    href: "/resources",
    icon: <Library className="w-5 h-5" />,
  },
  {
    label: "Admin",
    href: "/admin",
    icon: <Settings className="w-5 h-5" />,
    adminOnly: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">DisplayOS</h1>
        <p className="text-xs text-muted-foreground mt-1">Display Team Portal</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border pt-4 space-y-2">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Settings className="w-5 h-5" />
          Profile
        </Link>
        <button
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          className="w-full flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
