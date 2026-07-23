import { PageHeader } from "@/components";
import { MembersView } from "@/features/members/MembersView";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function MembersPage() {
  return (
    <div>
      <PageHeader
        title="Members"
        description="Team member directory and profiles"
        action={
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </Link>
        }
      />
      <MembersView />
    </div>
  );
}
