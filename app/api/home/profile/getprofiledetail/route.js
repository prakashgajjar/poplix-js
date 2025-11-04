import {  NextResponse } from "next/server";
import User from "../../../../../models/User.models";
import connectDB from "../../../../../lib/db";
import status from "../../../../../utils/status";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";
import "../../../../../models/Comment.models"


export async function POST(req) {
  await connectDB();
  const userId = await getUserIdFromToken();

  const  username  = await req.json();
  console.log("username", username);

  try {
    const user = await User.findOne({ username }).populate({
      path:"posts",
      populate:{
        path:"comments",
        populate:{
          path:"user"
        }
      }
    });

    // console.log(user);
    if (!user) {
      NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    return NextResponse.json(
      { message: status.OK.message, user, userId },
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
