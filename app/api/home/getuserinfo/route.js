import {NextResponse } from "next/server";
import User from "../../../../models/User.models";
import connectDB from "../../../../lib/db";
import status from "../../../../utils/status";
import { getUserIdFromToken } from "../../../../lib/getUserIdfromToken";
import "../../../../models/Post.models";

export async function GET() {
  await connectDB();
  const userId = await getUserIdFromToken();

  try {
    const user = await User.findOne({_id : userId}).populate({
        path:"posts",
    })

    // console.log(user);
    if (!user) {
      NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    return NextResponse.json(
      { message: status.OK.message, user  },
      { status: status.OK.code }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
