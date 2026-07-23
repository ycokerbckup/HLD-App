import { TrainingService } from "@/services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const training = await TrainingService.getAll();
    return NextResponse.json(training);
  } catch (error) {
    console.error("Error fetching training:", error);
    return NextResponse.json({ error: "Failed to fetch training" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const progress = await request.json();
    const created = await TrainingService.create(progress);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating training:", error);
    return NextResponse.json({ error: "Failed to create training" }, { status: 500 });
  }
}
