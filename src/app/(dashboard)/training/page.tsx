import { PageHeader } from "@/components";
import { TrainingView } from "@/features/training/TrainingView";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function TrainingPage() {
  return (
    <div>
      <PageHeader
        title="Training"
        description="Member training progress and module completion"
        action={
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Track Progress
          </Link>
        }
      />
      <TrainingView />
    </div>
  );
}
