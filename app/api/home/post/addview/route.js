import {  NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import status from "../../../../../utils/status";
import Post from "../../../../../models/Post.models";

export async function POST(req) {
  await connectDB();

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: status.FORBIDDEN.message },
        { status: status.FORBIDDEN.code }
      );
    }

    const post = await Post.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return NextResponse.json({ post }, { status: status.OK.code });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message, saved: false },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
