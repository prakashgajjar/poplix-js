import status from "../../../../utils/status";
import {  NextResponse } from "next/server";
import ChatMessage from "../../../../models/MessageChat.models";
import connectDB from "../../../../lib/db";
import { getUserIdFromToken } from "../../../../lib/getUserIdfromToken";
import Chat from "../../../../models/Chat.models";
import User from "../../../../models/User.models";

export async function POST(req) {
  await connectDB();
  const senderId = await getUserIdFromToken();
const receiverId  = await req.json();
  // console.log("receiverId : ", receiverId);

  if (!receiverId) {
    return NextResponse.json(
      { message: status.FORBIDDEN.message },
      { status: status.FORBIDDEN.code }
    );
  }

  try {
    const user = await User.findById(receiverId);

    if (!user) {
      return NextResponse.json(
        { message: status.UNAUTHORIZED.message },
        { status: status.UNAUTHORIZED.code }
      );
    }

    const chat = await Chat.findOne({
      isGroup: false,
      members: { $all: [senderId, receiverId], $size: 2 },
    });

    if (!chat) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    const messages = await ChatMessage.find({ chat: chat._id });
    if (!messages) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    return NextResponse.json(
      { messages: messages, user: user },
      { status: status.OK.code }
    );
  } catch (error) {
    console.log(" Error : ", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
