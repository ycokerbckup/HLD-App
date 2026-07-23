import { FeedbackService } from "@/services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const feedback = await FeedbackService.getAll();
    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const feedback = await request.json();
    const created = await FeedbackService.create(feedback);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json({ error: "Failed to create feedback" }, { status: 500 });
  }
}
