import { PageHeader } from "@/components";
import { ReportsView } from "@/features/reports/ReportsView";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Technical Reports"
        description="Equipment issues and technical problems"
        action={
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Report Issue
          </Link>
        }
      />
      <ReportsView />
    </div>
  );
}
