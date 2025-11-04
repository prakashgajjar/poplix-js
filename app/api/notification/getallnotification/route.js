import User from "../../../../models/User.models";
import { getUserIdFromToken } from "../../../../lib/getUserIdfromToken";
import "../../../../models/Notification.models";
import connectDB from "../../../../lib/db";
import { NextResponse } from "next/server";
import status from "../../../../utils/status";

export async function GET() {
  await connectDB();
  const id = await getUserIdFromToken();

  if (!id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: status.UNAUTHORIZED.code }
    );
  }

  try {
    const user = await User.findOne({ _id: id }).populate("notifications")

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: status.NOT_FOUND.code }
      );
    }

    return NextResponse.json(
      { user },
      { status: status.OK.code }
    );
  } catch (error) {
    console.error("Error fetching user with notifications:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
