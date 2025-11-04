import status from "../../../../utils/status";
import {  NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import { getUserIdFromToken } from "../../../../lib/getUserIdfromToken";
import User from "../../../../models/User.models";

export async function GET() {
  await connectDB();
  const userId = await getUserIdFromToken();

  if (!userId) {
    return NextResponse.json(
      { message: status.UNAUTHORIZED.message },
      { status: status.UNAUTHORIZED.code }
    );
  }
  try {
    const user = await User.findOne({ _id: userId }).populate("contacts");

    return NextResponse.json({ user }, { status: status.OK.code });
  } catch (error) {
    console.log(" Error : ", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
