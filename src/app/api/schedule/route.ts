import { ScheduleService } from "@/services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const entries = await ScheduleService.getUpcoming(30);
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const entry = await request.json();
    const created = await ScheduleService.create(entry);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating schedule entry:", error);
    return NextResponse.json({ error: "Failed to create schedule entry" }, { status: 500 });
  }
}
