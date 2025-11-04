import {  NextResponse } from "next/server";
import User from "../../../../models/User.models";
import connectDB from "../../../../lib/db";
import status from "../../../../utils/status";


export async function POST(req) {
  await connectDB();
  const {username} = await req.json();
  console.log(username);
  try {
    const user = await User.findOne({username : username})
    console.log(user);
    if (user) {
    return  NextResponse.json(
        { message: status.OK.message ,username:false
          },
        { status: status.OK.code }
      );
    }

    return NextResponse.json(
      { message: status.OK.message, username:true  },
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
