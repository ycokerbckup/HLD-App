import { AnnouncementsService } from "@/services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const announcements = await AnnouncementsService.getPublished();
    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const announcement = await request.json();
    const created = await AnnouncementsService.create(announcement);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
  }
}
