import { ReportsService } from "@/services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reports = await ReportsService.getAll();
    return NextResponse.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const report = await request.json();
    const created = await ReportsService.create(report);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
  }
}
