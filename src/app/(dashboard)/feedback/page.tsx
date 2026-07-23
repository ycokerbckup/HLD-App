import { PageHeader } from "@/components";
import { FeedbackView } from "@/features/feedback/FeedbackView";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function FeedbackPage() {
  return (
    <div>
      <PageHeader
        title="Feedback"
        description="Team suggestions, bugs, and improvement ideas"
        action={
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Submit Feedback
          </Link>
        }
      />
      <FeedbackView />
    </div>
  );
}
