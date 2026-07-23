"use client";

import { Feedback } from "@/types";
import { MessageSquare, Lightbulb, Bug, MessageCircle } from "lucide-react";

interface FeedbackCardProps {
  feedback: Feedback;
  onClick?: () => void;
}

const typeConfig = {
  bug: { icon: Bug, color: "text-red-500", label: "Bug" },
  feature: { icon: Lightbulb, color: "text-yellow-500", label: "Feature" },
  improvement: { icon: MessageCircle, color: "text-blue-500", label: "Improvement" },
  general: { icon: MessageSquare, color: "text-gray-500", label: "General" },
};

const statusConfig = {
  open: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  reviewed: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  addressed: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
};

export function FeedbackCard({ feedback, onClick }: FeedbackCardProps) {
  const type = typeConfig[feedback.type];
  const Icon = type.icon;

  return (
    <div
      onClick={onClick}
      className="rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-1 ${type.color}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">{type.label}</p>
              <h3 className="font-semibold">{feedback.title}</h3>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${statusConfig[feedback.status]}`}>
              {feedback.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{feedback.message}</p>
          <p className="text-xs text-muted-foreground mt-3">
            {new Date(feedback.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
