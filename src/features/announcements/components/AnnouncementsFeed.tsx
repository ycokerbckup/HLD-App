"use client";

import { Announcement } from "@/types";
import { AnnouncementCard } from "./AnnouncementCard";

interface AnnouncementsFeedProps {
  announcements: Announcement[];
  onSelectAnnouncement?: (announcement: Announcement) => void;
}

export function AnnouncementsFeed({ announcements, onSelectAnnouncement }: AnnouncementsFeedProps) {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          onClick={() => onSelectAnnouncement?.(announcement)}
        />
      ))}
      {announcements.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No announcements yet</p>
        </div>
      )}
    </div>
  );
}
