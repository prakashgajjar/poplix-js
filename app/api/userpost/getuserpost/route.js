import status from "../../../../utils/status";
import {  NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import "../../../../models/Comment.models";
import "../../../../models/User.models";
import User from "../../../../models/User.models";
import "../../../../models/Post.models";
import Post from "../../../../models/Post.models";

export async function POST(req) {
  await connectDB();

  try {
    const { username } = await req.json();

    const user = await User.findOne({ username })
    // console.log(username);

     const populatedPosts = await Post.find({user : user._id})  
          .populate({
            path: "user", // user who posted or reposted
          })
          .populate({
            path: "retweetOf", // the original post
            populate: {
              path: "user", // also populate the user of the original post
            },
          })
          .sort({ createdAt: -1 });


    // console.log(user);

    return NextResponse.json({ status: status.OK.code, posts: populatedPosts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
