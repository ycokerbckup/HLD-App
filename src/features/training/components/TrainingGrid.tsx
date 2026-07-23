"use client";

import { TrainingProgress } from "@/types";
import { TrainingCard } from "./TrainingCard";

interface TrainingGridProps {
  progressList: TrainingProgress[];
  memberNames?: Record<string, string>;
  onSelectProgress?: (progress: TrainingProgress) => void;
}

export function TrainingGrid({ progressList, memberNames = {}, onSelectProgress }: TrainingGridProps) {
  const modules = ["propresenter", "vmix", "resolume", "hardware", "networking"];
  const grouped = modules.map((module) => ({
    module,
    items: progressList.filter((p) => p.module === module as any),
  }));

  return (
    <div className="space-y-8">
      {grouped.map(({ module, items }) => (
        <div key={module}>
          <h3 className="text-lg font-semibold mb-3 capitalize">{module.replace(/_/g, " ")}</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((progress) => (
              <TrainingCard
                key={progress.id}
                progress={progress}
                memberName={memberNames[progress.memberId]}
                onClick={() => onSelectProgress?.(progress)}
              />
            ))}
          </div>
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">No training data for this module</p>
          )}
        </div>
      ))}
    </div>
  );
}
