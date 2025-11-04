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
        { message: status.FORBIDDEN.message, saved: false },
        { status: status.FORBIDDEN.code }
      );
    }

    const userId = await getUserIdFromToken();
    const findUser = await User.findById(userId);
    const post = await Post.findById(id);

    if (!findUser || !post) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message, saved: false },
        { status: status.NOT_FOUND.code }
      );
    }

    if (findUser.savedPosts.includes(id)) {
      await findUser.savedPosts.remove(id);
      await post?.saved?.remove(userId);
      await findUser.save();
      await post.save();
      return NextResponse.json({ saved: false }, { status: status.OK.code });
    }

    await findUser.savedPosts.push(id);
    await post?.saved?.push(userId);
    await findUser.save();
    await post.save();

    return NextResponse.json( { saved: true  }, { status: status.OK.code });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message, saved: false },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
