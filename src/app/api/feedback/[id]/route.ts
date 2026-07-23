import { FeedbackService } from "@/services";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const feedback = await FeedbackService.getById(params.id);
    if (!feedback) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }
    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const updated = await FeedbackService.update(params.id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating feedback:", error);
    return NextResponse.json({ error: "Failed to update feedback" }, { status: 500 });
  }
}
