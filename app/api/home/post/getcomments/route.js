import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import status from "../../../../../utils/status";
import Post from "../../../../../models/Post.models";
import "../../../../../models/Comment.models";

export async function POST(req) {
  await connectDB();

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: status.BAD_REQUEST.code }
      );
    }

    const post = await Post.findById(id).populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: status.NOT_FOUND.code }
      );
    }

    return NextResponse.json(
      { comments: post.comments },
      { status: status.OK.code }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
