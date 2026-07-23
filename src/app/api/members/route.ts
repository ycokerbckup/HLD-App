import { MembersService } from "@/services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const members = await MembersService.getAll();
    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const member = await request.json();
    const created = await MembersService.create(member);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating member:", error);
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
  }
}
