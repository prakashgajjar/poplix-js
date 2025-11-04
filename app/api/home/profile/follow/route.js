import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";
import { NextRequest, NextResponse } from "next/server";
import { Notification } from "../../../../../models/Notification.models";
import User from "../../../../../models/User.models";
import status from "../../../../../utils/status";

export async function POST(req) {
  try {
    const userId = await getUserIdFromToken();
  const  id  = await req.json();
    // console.log(userId , id);

    if (!userId || !id) {
      return NextResponse.json(
        { message: status.UNAUTHORIZED.message },
        { status: status.UNAUTHORIZED.code }
      );
    }

    const followRequestFrom = await User.findOne({ _id: userId });
    const followRequestTo = await User.findOne({ _id: id });

    if (followRequestTo.followers.includes(userId)) {
      await followRequestFrom?.following?.pull(id);
      await followRequestTo?.followers?.pull(userId);
      await followRequestFrom.save();
      await followRequestTo.save();
      return NextResponse.json(
        { message: status.OK.message , follow:false },
        { status: status.OK.code }
      );
    }

    await followRequestFrom?.following?.push(id);
    await followRequestTo?.followers?.push(userId);

    await followRequestFrom.save();
    await followRequestTo.save();

    const notification = await Notification.create({
      recipient: id,
      sender: userId,
      type: "follow",
      message: `started following you`,
      meta: {
        avatar: followRequestFrom?.avatar,
        username: followRequestFrom?.username,
      },
    });

    if (notification) {
      await followRequestTo?.notifications?.push(notification._id);
      console.log(followRequestTo);
      await followRequestTo.save();
    }

    return NextResponse.json(
      { message: status.OK.message, follow:true },
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
