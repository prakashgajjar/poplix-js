import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import status from "../../../../../utils/status";
import Post from "../../../../../models/Post.models";
import User from "../../../../../models/User.models";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";

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

    const userId = await getUserIdFromToken();

    const findPost = await Post.findById(id);
    const findUser = await User.findById(userId);

    if (!findPost || !findUser) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    const postAlreadyLiked = findPost.likes.includes(userId);
    const userAlreadyLiked = findUser.likes.includes(id);

    if (postAlreadyLiked) {
      findPost.likes = findPost.likes.filter((uid) => uid.toString() !== userId);
      await findPost.save();
    } else {
      findPost.likes.push(userId);
      await findPost.save();
    }

    if (userAlreadyLiked) {
      findUser.likes = findUser.likes.filter((pid) => pid.toString() !== id);
      await findUser.save({optimisticConcurrency: false});
    } else {
      findUser.likes.push(id);
      await findUser.save({ validateBeforeSave: false });
    }

    return NextResponse.json(
      { liked: !postAlreadyLiked },
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
