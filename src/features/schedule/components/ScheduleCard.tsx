"use client";

import { ScheduleEntry } from "@/types";
import { Calendar, MapPin, Clock } from "lucide-react";

interface ScheduleCardProps {
  entry: ScheduleEntry;
  onClick?: () => void;
}

const typeColors: Record<string, string> = {
  sunday: "bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200",
  wednesday: "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200",
  tuesday: "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200",
  saturday: "bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-200",
  special: "bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200",
};

export function ScheduleCard({ entry, onClick }: ScheduleCardProps) {
  const colorClass = typeColors[entry.type] || typeColors.special;
  const date = new Date(entry.date);
  const isUpcoming = date > new Date();

  return (
    <div
      onClick={onClick}
      className="rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
              {entry.type.toUpperCase()}
            </span>
            {isUpcoming && (
              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200">
                Upcoming
              </span>
            )}
          </div>
          <p className="font-semibold">{entry.description}</p>
          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {date.toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {entry.duration} minutes
            </div>
            {entry.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {entry.location}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
