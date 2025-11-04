import status from "../../../../utils/status";
import { NextResponse } from "next/server";
import User from "../../../../models/User.models";

export async function POST(req) {
  try {
   const {username} = await req.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: status.BAD_REQUEST.code }
      );
    }

const user = await User.find({
  $or: [
    { username: { $regex: username, $options: "i" } }, // similar usernames 
    { fullname: { $regex: username, $options: "i" } }  // similar fullnames
  ]
})


    if (!user) {
      return NextResponse.json(
        { error: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    return NextResponse.json(user, { status: status.OK.code });
  } catch (error) {
    console.error("Error finding user:", error);
    return NextResponse.json(
      { error: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}