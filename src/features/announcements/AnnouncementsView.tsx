"use client";

import { useState, useEffect } from "react";
import { Announcement } from "@/types";
import { AnnouncementsFeed, AnnouncementDetail } from "@/features/announcements/components";
import { LoadingSkeleton } from "@/components";

export function AnnouncementsView() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const response = await fetch("/api/announcements");
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      <AnnouncementsFeed
        announcements={announcements}
        onSelectAnnouncement={setSelectedAnnouncement}
      />
      {selectedAnnouncement && (
        <AnnouncementDetail
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      )}
    </>
  );
}
