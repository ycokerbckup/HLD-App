"use client";

import { TechnicalReport } from "@/types";
import { AlertCircle, AlertTriangle, AlertOctagon, CheckCircle2 } from "lucide-react";

interface ReportCardProps {
  report: TechnicalReport;
  onClick?: () => void;
}

const priorityConfig = {
  low: { icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900" },
  medium: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900" },
  high: { icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900" },
  critical: { icon: AlertOctagon, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900" },
};

const statusConfig = {
  open: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  in_progress: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  resolved: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  closed: "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
};

export function ReportCard({ report, onClick }: ReportCardProps) {
  const priorityConfig_ = priorityConfig[report.priority];
  const Icon = priorityConfig_.icon;

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer ${priorityConfig_.bg}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-1 ${priorityConfig_.color}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold">{report.title}</h3>
            <span className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${statusConfig[report.status]}`}>
              {report.status.replace(/_/g, " ")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{report.equipment}</p>
          <p className="text-xs mt-2 line-clamp-2">{report.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">
              {new Date(report.createdAt).toLocaleDateString()}
            </span>
            {report.assignedTo && (
              <span className="text-xs font-medium bg-background/50 px-2 py-1 rounded">
                {report.assignedTo}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
