import { ScheduleService } from "@/services";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const entry = await ScheduleService.getById(params.id);
    if (!entry) {
      return NextResponse.json({ error: "Schedule entry not found" }, { status: 404 });
    }
    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error fetching schedule entry:", error);
    return NextResponse.json({ error: "Failed to fetch schedule entry" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const updated = await ScheduleService.update(params.id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Schedule entry not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating schedule entry:", error);
    return NextResponse.json({ error: "Failed to update schedule entry" }, { status: 500 });
  }
}
