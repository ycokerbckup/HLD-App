"use client";

import { Announcement } from "@/types";
import { X } from "lucide-react";

interface AnnouncementDetailProps {
  announcement: Announcement;
  onClose: () => void;
}

export function AnnouncementDetail({ announcement, onClose }: AnnouncementDetailProps) {
  const priorityColors = {
    low: "text-blue-700 dark:text-blue-200",
    medium: "text-yellow-700 dark:text-yellow-200",
    high: "text-orange-700 dark:text-orange-200",
    urgent: "text-red-700 dark:text-red-200",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="inline-block align-bottom bg-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-card px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{announcement.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-sm font-medium ${priorityColors[announcement.priority]}`}>
                    {announcement.priority.toUpperCase()}
                  </span>
                  {announcement.pinned && (
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      Pinned
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{announcement.content}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Posted on {new Date(announcement.createdAt).toLocaleDateString()} by {announcement.createdBy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
