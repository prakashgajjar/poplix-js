import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";
import { NextResponse } from "next/server";
import Post from "../../../../../models/Post.models";
import status from "../../../../../utils/status";

export async function POST(req) {
  try {
    const userId = await getUserIdFromToken();
    const { postId } = await req.json();

    const oldPost = await Post.findById(postId);
    if (!oldPost) {
      return NextResponse.json(
        { message: "Original post not found" },
        { status: 404 }
      );
    }

    // Check if already retweeted
    const existing = await Post.findOne({
      user: userId,
      isRetweet: true,
      retweetOf: postId,
    });

    if (existing) {
      return NextResponse.json(
        { message: status.CONFLICT.message },
        { status: status.CONFLICT.code }
      );
    }

    const retweetDoc = await Post.create({
      user: userId,
      isRetweet: true,
      retweetOf: postId,
      type: oldPost.type,
    });

    const retweet = retweetDoc.toObject({ getters: true, versionKey: false });

    oldPost.countRepost = (oldPost.countRepost || 0) + 1;
    await oldPost.save();

    return NextResponse.json(
      {
        message: status.OK.message,
        retweet,
      },
      {
        status: status.OK.code,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
