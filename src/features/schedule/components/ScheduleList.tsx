"use client";

import { ScheduleEntry } from "@/types";
import { ScheduleCard } from "./ScheduleCard";

interface ScheduleListProps {
  entries: ScheduleEntry[];
  onSelectEntry?: (entry: ScheduleEntry) => void;
}

export function ScheduleList({ entries, onSelectEntry }: ScheduleListProps) {
  // Group entries by date
  const grouped = entries.reduce(
    (acc, entry) => {
      const date = new Date(entry.date).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(entry);
      return acc;
    },
    {} as Record<string, ScheduleEntry[]>
  );

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date}>
          <h3 className="font-semibold text-lg mb-3">{date}</h3>
          <div className="space-y-3">
            {grouped[date].map((entry) => (
              <ScheduleCard
                key={entry.id}
                entry={entry}
                onClick={() => onSelectEntry?.(entry)}
              />
            ))}
          </div>
        </div>
      ))}
      {entries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No scheduled events</p>
        </div>
      )}
    </div>
  );
}
