import {  NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import status from "../../../../../utils/status";
import Post from "../../../../../models/Post.models";
import User from "../../../../../models/User.models";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";
import Comment from "../../../../../models/Comment.models";

export async function POST(req) {
  await connectDB();

  try {
    const { id, content } = await req.json();
    const userId = await getUserIdFromToken();
    if (!id) {
      return NextResponse.json(
        { message: status.FORBIDDEN.message },
        { status: status.FORBIDDEN.code }
      );
    }

    const findPost = await Post.findById(id);
    const findUser = await User.findById(userId);

    if (!findPost || !findUser) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    const comment = await Comment.create({
      content,
      post: id,
      user: userId,
    })

     findPost.comments.push(comment._id);
     findUser.comments.push(comment._id);

    await findPost.save();
    await findUser.save();

    return NextResponse.json(
      { message: status.OK.message, comment },
      { status: status.OK.code }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
