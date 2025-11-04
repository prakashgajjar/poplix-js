import { NextResponse } from "next/server";
import User from "../../../../../models/User.models";
import status from "../../../../../utils/status";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";

export async function POST(req) {
  try {
    const {id} = await req.json();
    const userId = await getUserIdFromToken();

    if (!id) {
      return NextResponse.json(
        { message: status.UNAUTHORIZED.message },
        { status: status.UNAUTHORIZED.code }
      );
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    const removedId = await user.followers.remove(id);
    await user.save();
    return NextResponse.json(
      { removedId: removedId },
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
