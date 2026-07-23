"use client";

import { useState, useEffect } from "react";
import { Feedback } from "@/types";
import { FeedbackList } from "@/features/feedback/components";
import { LoadingSkeleton } from "@/components";

export function FeedbackView() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await fetch("/api/feedback");
        if (response.ok) {
          const data = await response.json();
          setFeedbackList(data);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return <FeedbackList feedbackList={feedbackList} />;
}
