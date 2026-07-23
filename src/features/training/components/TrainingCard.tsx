"use client";

import { TrainingProgress } from "@/types";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface TrainingCardProps {
  progress: TrainingProgress;
  memberName?: string;
  onClick?: () => void;
}

const statusConfig = {
  not_started: { icon: Circle, color: "text-gray-400", bg: "bg-gray-50 dark:bg-gray-900" },
  in_progress: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900" },
  completed: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900" },
};

export function TrainingCard({ progress, memberName, onClick }: TrainingCardProps) {
  const config = statusConfig[progress.status];
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer ${config.bg}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${config.color}`} />
            <p className="font-semibold text-sm">{progress.module.replace(/_/g, " ").toUpperCase()}</p>
          </div>
          {memberName && <p className="text-xs text-muted-foreground mt-1">{memberName}</p>}
          
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium">{progress.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${progress.progress}%` }}
              />
            </div>
          </div>
          
          <span className="inline-block mt-3 text-xs font-medium text-muted-foreground bg-background/50 px-2 py-1 rounded">
            {progress.status.replace(/_/g, " ")}
          </span>
        </div>
      </div>
    </div>
  );
}
