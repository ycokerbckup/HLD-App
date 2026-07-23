import { PageHeader } from "@/components";
import { ScheduleView } from "@/features/schedule/ScheduleView";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function SchedulePage() {
  return (
    <div>
      <PageHeader
        title="Schedule"
        description="Upcoming team events and duty assignments"
        action={
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </Link>
        }
      />
      <ScheduleView />
    </div>
  );
}
