import { NextResponse } from "next/server";
import User from "../../../../../models/User.models";
import status from "../../../../../utils/status";

export async function POST(req) {
  try {
    const  username  = await req.json();

    if (!username) {
      return NextResponse.json(
        { message: status.UNAUTHORIZED.message },
        { status: status.UNAUTHORIZED.code }
      );
    }

    const user = await User.findOne({ username: username }).populate({
      path: "following",
    });

    if (!user) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    return NextResponse.json(
      { following: user.following },
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
