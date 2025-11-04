import connectDB from "../../../../lib/db";
import { getUserIdFromToken } from "../../../../lib/getUserIdfromToken";
import status from "../../../../utils/status";
import User from "../../../../models/User.models";
import { NextResponse } from "next/server";


export async function GET() {
  await connectDB();
  const user = await getUserIdFromToken();
  console.log(user)

  try {
    if (!user) {
      return NextResponse.json({message:status.UNAUTHORIZED.message}, { status: status.UNAUTHORIZED.code });
    }
    const bookmarks = await User.findOne({_id :user}).populate(
    {path:'savedPosts',
    populate:{
      path:"user"
    }
    })
    if (!bookmarks) {
      return NextResponse.json(
        { message: "user not found" },
        { status: status.NOT_FOUND.code }
      );
    }
    return NextResponse.json(
      {posts : bookmarks.savedPosts},
      { status: status.OK.code }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: status.FORBIDDEN },
      { status: status.FORBIDDEN.code }
    );
  }
}
