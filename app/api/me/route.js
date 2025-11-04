// app/api/get-user-id/route.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function POST(req) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/login=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) {
      return NextResponse.json({ userId: null }, { status: 200 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({ userId: payload.userId }, { status: 200 });
  } catch (err) {
    console.error("Token decode error:", err);
    return NextResponse.json({ userId: null }, { status: 500 });
  }
}
