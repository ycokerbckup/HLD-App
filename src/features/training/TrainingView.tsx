"use client";

import { useState, useEffect } from "react";
import { TrainingProgress } from "@/types";
import { TrainingGrid } from "@/features/training/components";
import { LoadingSkeleton } from "@/components";

export function TrainingView() {
  const [progressList, setProgressList] = useState<TrainingProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTraining() {
      try {
        const response = await fetch("/api/training");
        if (response.ok) {
          const data = await response.json();
          setProgressList(data);
        }
      } catch (error) {
        console.error("Error fetching training:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTraining();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return <TrainingGrid progressList={progressList} />;
}
