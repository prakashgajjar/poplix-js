import status from "../../../../utils/status";
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import { getUserIdFromToken } from "../../../../lib/getUserIdfromToken";
import User from "../../../../models/User.models.js";
import Chat from "../../../../models/Chat.models.js"

export async function GET() {
  try {
    await connectDB();

    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json(
        { message: status.UNAUTHORIZED.message },
        { status: status.UNAUTHORIZED.code }
      );
    }

    // Fetch the user and populate contacts with limited fields only
    const user = await User.findById(userId)
      .populate("contacts", "_id fullname username avatar")
      .lean();

      console.log(user)

      const chat = await  Chat.find({members: {$all: [userId]}});


    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: status.NOT_FOUND.code }
      );
    }

    return NextResponse.json(
      { contacts: user.contacts },
      { status: status.OK.code }
    );
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
