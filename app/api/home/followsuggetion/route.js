import { NextResponse } from "next/server";
import { getUserIdFromToken } from "../../../../lib/getUserIdfromToken";
import status from "../../../../utils/status";
import User from "../../../../models/User.models";
import connectDB from "../../../../lib/db";

export async function GET() {
  await connectDB();
  const userId = await getUserIdFromToken();

  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
          followers: { $nin: [userId] },
        },
      },
      { $sort: { followers: -1 } },
      { $limit: 30 },
    ]);

    const selectedUsers = [...user].sort(() => 0.5 - Math.random()).slice(0, 2);

    return NextResponse.json(
      { message: status.OK.message, selectedUsers },
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
