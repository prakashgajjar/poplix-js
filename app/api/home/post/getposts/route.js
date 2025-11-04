import Post from "../../../../../models/Post.models";
import status from "../../../../../utils/status";
import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import "../../../../../models/Comment.models";
import "../../../../../models/User.models";

export async function POST(req) {
  await connectDB();

  try {
    const { page } = await req.json();
    const limit = 15;
    const skip = (page - 1) * limit;

    const posts = await Post.find({})
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit)
      .populate("user")
      .populate({
        path: "retweetOf",
        populate: { path: "user" },
      })
      .populate({
        path: "comments",
        populate: { path: "user" },
      });

    return NextResponse.json({ status: status.OK.code, data: posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}

