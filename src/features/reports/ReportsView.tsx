"use client";

import { useState, useEffect } from "react";
import { TechnicalReport } from "@/types";
import { ReportsList } from "@/features/reports/components";
import { LoadingSkeleton } from "@/components";

export function ReportsView() {
  const [reports, setReports] = useState<TechnicalReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch("/api/reports");
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return <ReportsList reports={reports} />;
}
