import { PageHeader } from "@/components";
import { AnnouncementsView } from "@/features/announcements/AnnouncementsView";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AnnouncementsPage() {
  return (
    <div>
      <PageHeader
        title="Announcements"
        description="Stay updated with team announcements and notices"
        action={
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            New Announcement
          </Link>
        }
      />
      <AnnouncementsView />
    </div>
  );
}
