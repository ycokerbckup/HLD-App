"use client";

import { Announcement } from "@/types";
import { AlertCircle, AlertTriangle, AlertOctagon } from "lucide-react";

interface AnnouncementCardProps {
  announcement: Announcement;
  onClick?: () => void;
}

const priorityConfig = {
  low: { bg: "bg-blue-50 dark:bg-blue-900", text: "text-blue-700 dark:text-blue-200", icon: AlertCircle },
  medium: { bg: "bg-yellow-50 dark:bg-yellow-900", text: "text-yellow-700 dark:text-yellow-200", icon: AlertTriangle },
  high: { bg: "bg-orange-50 dark:bg-orange-900", text: "text-orange-700 dark:text-orange-200", icon: AlertTriangle },
  urgent: { bg: "bg-red-50 dark:bg-red-900", text: "text-red-700 dark:text-red-200", icon: AlertOctagon },
};

export function AnnouncementCard({ announcement, onClick }: AnnouncementCardProps) {
  const config = priorityConfig[announcement.priority];
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border ${config.bg} p-6 cursor-pointer hover:shadow-md transition-shadow ${announcement.pinned ? "ring-2 ring-primary" : ""}`}
    >
      <div className="flex items-start gap-4">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-1 ${config.text}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg">{announcement.title}</h3>
              {announcement.pinned && (
                <span className="inline-block mt-2 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  Pinned
                </span>
              )}
            </div>
            <span className={`inline-flex items-center rounded-md ${config.text} text-xs font-medium px-2 py-1`}>
              {announcement.priority}
            </span>
          </div>
          <p className="text-sm mt-3 line-clamp-2">{announcement.content}</p>
          <p className="text-xs text-muted-foreground mt-3">
            {new Date(announcement.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
