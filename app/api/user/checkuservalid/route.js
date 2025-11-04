import { NextResponse } from "next/server";
import User from "../../../../models/User.models";
import connectDB from "../../../../lib/db";
import status from "../../../../utils/status";
import { getUserIdFromToken } from "../../../../lib/getUserIdfromToken";

export async function POST(req) {
  await connectDB();
  const { username } = await req.json();
  console.log(username);
  try {
    const user = await User.findOne({ username: username });
    const userId = await getUserIdFromToken();
    // console.log(user._id , userId);

    if (!user || !userId) {
      return NextResponse.json(
        { auth: false },
        { status: status.NOT_FOUND.code }
      );
    }

    if (user._id == userId) {
      return NextResponse.json(
        { message: status.OK.message, auth: true },
        { status: status.OK.code }
      );
    } else {
      return NextResponse.json(
        { message: status.OK.message, auth: false },
        { status: status.OK.code }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message , auth:false },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
