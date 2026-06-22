import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mangodb";
import Story from "../../../models/Story";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const story = await Story.create(body);
    return NextResponse.json({ success: true, story }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create story", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const stories = await Story.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, stories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch stories", error }, { status: 500 });
  }
}
