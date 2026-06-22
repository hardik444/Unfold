import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mangodb";
import Story from "../../../models/Story";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ success: true, stories: [] });
    }

    const stories = await Story.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { summary: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    } as any);

    return NextResponse.json({ success: true, stories });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
