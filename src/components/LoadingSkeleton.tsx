"use client";

import { ReactNode } from "react";

export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-12 bg-muted rounded-lg"></div>
      <div className="h-32 bg-muted rounded-lg"></div>
      <div className="h-32 bg-muted rounded-lg"></div>
      <div className="h-32 bg-muted rounded-lg"></div>
    </div>
  );
}
