import { TrainingService } from "@/services";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const training = await TrainingService.getAll();
    const item = training.find((t) => t.id === params.id);
    if (!item) {
      return NextResponse.json({ error: "Training not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching training:", error);
    return NextResponse.json({ error: "Failed to fetch training" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const updated = await TrainingService.update(params.id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Training not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating training:", error);
    return NextResponse.json({ error: "Failed to update training" }, { status: 500 });
  }
}
