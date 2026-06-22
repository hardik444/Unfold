import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password, accessKey } = await req.json();

  if (accessKey !== process.env.ADMIN_ACCESS_KEY) {
    return Response.json(
      {
        success: false,
        message: "Invalid access key",
      },
      { status: 401 }
    );
  }
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
