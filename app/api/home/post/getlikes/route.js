import {  NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import status from "../../../../../utils/status";
import User from "../../../../../models/User.models";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";

export async function GET() {
  await connectDB();

  try {

    const userId = await getUserIdFromToken();

    const user = await User.findById(userId).select("likes");
    if (!user) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    return NextResponse.json({ likedPostIds: user.likes }, { status: status.OK.code });

  } catch (error) {
    console.error("Error getting liked post IDs:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
