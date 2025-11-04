import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User.models";
import connectDB from "../../../../../lib/db";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";
import status from "../../../../../utils/status";

export async function POST(req) {
  await connectDB();
  const userId = await getUserIdFromToken();
  const { fullname, bio } = await req.json();

  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: status.UNAUTHORIZED.message },
        { status: status.UNAUTHORIZED.code }
      );
    }
    if (!fullname && !bio) {
      return NextResponse.json(
        { message: status.FORBIDDEN.message },
        { status: status.FORBIDDEN.code }
      );
    }

    if(fullname){
        user.fullname = fullname;
        await user.save()
    }
    if(bio){
        user.bio = bio;
        await user.save()
    }

    return NextResponse.json({user}, { status: status.OK.code });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
