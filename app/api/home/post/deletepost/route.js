import { NextResponse  } from "next/server";
import status from "../../../../../utils/status";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";
import connectDB from "../../../../../lib/db";
import Post from "../../../../../models/Post.models";
import User from "../../../../../models/User.models";

export async function POST(req) {
    
    await connectDB();
    
    const userId = await getUserIdFromToken();
    const {postId}  = await req.json();
    console.log(userId, postId);

    if(!userId || !postId) {
        return NextResponse.json({ message: status.UNAUTHORIZED.message }, { status: status.UNAUTHORIZED.code });
    }

    try {

        const post = await Post.findByIdAndDelete(postId);
        const user  = await User.findById(userId);

        if(!post || !user) {
            return NextResponse.json({ message: status.NOT_FOUND.message }, { status: status.NOT_FOUND.code });
        }

        user.posts.remove(postId);
        await user.save();

        return NextResponse.json({ message: status.OK.message }, { status: status.OK.code });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: status.INTERNAL_ERROR.message }, { status: status.INTERNAL_ERROR.code });
    }
}