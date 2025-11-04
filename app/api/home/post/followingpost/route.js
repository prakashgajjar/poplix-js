import connectDB from "../../../../../lib/db";
import User from "../../../../../models/User.models";
import Post from "../../../../../models/Post.models";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";
import {  NextResponse } from "next/server";
import status from "../../../../../utils/status";

export async function POST(req) {
  await connectDB();
  const { page } = await req.json();
  const limit = 15;
  const skip = (page - 1) * limit;
  try {
    const userId = await getUserIdFromToken();
    const user = await User.findById(userId).populate("following");

    if (!user) {
      return NextResponse.json(
        { message: status.UNAUTHORIZED.message },
        { status: status.UNAUTHORIZED.code }
      );
    }

    const followingIds = user.following.map((f) => f._id);

    const posts = await Post.find({ user: { $in: followingIds } })
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit)
      .populate("user")
      .populate({
        path: "retweetOf",
        populate: {
          path: "user", // also populate the user of the original post
        },
      })
      .sort({ createdAt: -1 });

    const shuffled = posts.sort(() => Math.random() - 0.5);

    return NextResponse.json({
      status: status.OK.code,
      posts: shuffled,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
