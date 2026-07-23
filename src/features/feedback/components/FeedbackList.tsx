"use client";

import { Feedback } from "@/types";
import { FeedbackCard } from "./FeedbackCard";

interface FeedbackListProps {
  feedbackList: Feedback[];
  onSelectFeedback?: (feedback: Feedback) => void;
}

export function FeedbackList({ feedbackList, onSelectFeedback }: FeedbackListProps) {
  const open = feedbackList.filter((f) => f.status === "open");
  const reviewed = feedbackList.filter((f) => f.status === "reviewed");
  const addressed = feedbackList.filter((f) => f.status === "addressed");

  return (
    <div className="space-y-8">
      {open.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Open Feedback ({open.length})</h3>
          <div className="space-y-3">
            {open.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                feedback={feedback}
                onClick={() => onSelectFeedback?.(feedback)}
              />
            ))}
          </div>
        </div>
      )}

      {reviewed.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Under Review ({reviewed.length})</h3>
          <div className="space-y-3">
            {reviewed.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        </div>
      )}

      {addressed.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-muted-foreground">Addressed ({addressed.length})</h3>
          <div className="space-y-3 opacity-60">
            {addressed.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        </div>
      )}

      {feedbackList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No feedback yet</p>
        </div>
      )}
    </div>
  );
}
