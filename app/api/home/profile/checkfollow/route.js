import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";
import { NextResponse } from "next/server";
import User from "../../../../../models/User.models";
import status from "../../../../../utils/status";

export async function POST(req) {
  try {
    const userId = await getUserIdFromToken();
    const id = await req.json();
    console.log(userId, id);

    if (!userId || !id) {
      return NextResponse.json(
        { message: status.UNAUTHORIZED.message },
        { status: status.UNAUTHORIZED.code }
      );
    }

    const checkFollow = await User.findOne({ _id: userId });

    if (checkFollow?.following?.includes(id)) {
      return NextResponse.json(
        { message: status.OK.message, follow: true },
        { status: status.OK.code }
      );
    } else {
      return NextResponse.json(
        { message: status.OK.message, follow: false },
        { status: status.OK.code }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
