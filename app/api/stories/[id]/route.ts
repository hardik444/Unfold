import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mangodb";
import Story from "../../../../models/Story";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectDB();
  const story = await Story.findById(id);
  return NextResponse.json({ success: true, story });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectDB();
  const body = await req.json();
  const story = await Story.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ success: true, story });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectDB();
  await Story.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
