"use client";

import { TechnicalReport } from "@/types";
import { ReportCard } from "./ReportCard";

interface ReportsListProps {
  reports: TechnicalReport[];
  onSelectReport?: (report: TechnicalReport) => void;
}

export function ReportsList({ reports, onSelectReport }: ReportsListProps) {
  const open = reports.filter((r) => r.status !== "closed");
  const closed = reports.filter((r) => r.status === "closed");

  return (
    <div className="space-y-8">
      {open.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Open Reports ({open.length})</h3>
          <div className="space-y-3">
            {open.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => onSelectReport?.(report)}
              />
            ))}
          </div>
        </div>
      )}

      {closed.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-muted-foreground">Closed Reports ({closed.length})</h3>
          <div className="space-y-3 opacity-60">
            {closed.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      )}

      {reports.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No technical reports</p>
        </div>
      )}
    </div>
  );
}
