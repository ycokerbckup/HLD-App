import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MembersService, AnnouncementsService, ScheduleService } from "@/services";
import { PageHeader, StatCard, AnimatedCard } from "@/components";
import { Users, Megaphone, Calendar } from "lucide-react";
import Link from "next/link";

async function DashboardContent() {
  const session = await getServerSession(authOptions);
  const [members, announcements, schedule] = await Promise.all([
    MembersService.getAll().catch(() => []),
    AnnouncementsService.getPublished().catch(() => []),
    ScheduleService.getUpcoming(7).catch(() => []),
  ]);

  const nextEvent = schedule[0];
  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${session?.user?.name?.split(" ")[0]}`}
        description="Here's what's happening with the Display Team"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          label="Team Members"
          value={members.length}
          icon={<Users className="w-8 h-8" />}
        />
        <StatCard
          label="Active Announcements"
          value={announcements.length}
          icon={<Megaphone className="w-8 h-8" />}
        />
        <StatCard
          label="Upcoming Events"
          value={schedule.length}
          icon={<Calendar className="w-8 h-8" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatedCard delay={0.1}>
          <h2 className="text-lg font-semibold mb-4">Next Event</h2>
          {nextEvent ? (
            <div className="space-y-2">
              <p className="font-medium">{nextEvent.type.toUpperCase()}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(nextEvent.date).toLocaleDateString()}
              </p>
              <p className="text-sm mt-3">{nextEvent.description}</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No upcoming events</p>
          )}
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <h2 className="text-lg font-semibold mb-4">Latest Announcements</h2>
          <div className="space-y-3">
            {recentAnnouncements.length > 0 ? (
              recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border-b border-border pb-3 last:border-0">
                  <p className="font-medium text-sm">{announcement.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {announcement.content.substring(0, 60)}...
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No announcements</p>
            )}
          </div>
          <Link
            href="/announcements"
            className="inline-block mt-4 text-sm text-primary hover:underline"
          >
            View all →
          </Link>
        </AnimatedCard>
      </div>

      <AnimatedCard delay={0.3}>
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Link
            href="/members"
            className="rounded-lg border border-border p-4 text-center hover:bg-muted transition-colors"
          >
            <p className="text-sm font-medium">Members</p>
          </Link>
          <Link
            href="/schedule"
            className="rounded-lg border border-border p-4 text-center hover:bg-muted transition-colors"
          >
            <p className="text-sm font-medium">Schedule</p>
          </Link>
          <Link
            href="/training"
            className="rounded-lg border border-border p-4 text-center hover:bg-muted transition-colors"
          >
            <p className="text-sm font-medium">Training</p>
          </Link>
          <Link
            href="/reports"
            className="rounded-lg border border-border p-4 text-center hover:bg-muted transition-colors"
          >
            <p className="text-sm font-medium">Reports</p>
          </Link>
        </div>
      </AnimatedCard>
    </div>
  );
}

export default async function DashboardPage() {
  return <DashboardContent />;
}
