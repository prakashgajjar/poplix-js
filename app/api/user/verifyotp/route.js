import User from "../../../../models/User.models";
import {  NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import status from "../../../../utils/status";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  await connectDB();
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: status.BAD_REQUEST.message },
        { status: status.BAD_REQUEST.code }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    if (user.otp !== otp) {
      return NextResponse.json(
        { error: status.BAD_REQUEST.message },
        { status: status.BAD_REQUEST.code }
      );
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json(
        { error: "JWT secret is not defined in environment variables." },
        { status: status.INTERNAL_ERROR.code }
      );
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      jwtSecret,
      { expiresIn: "2d" }
    );

    const cookieStore = cookies();
    (await cookieStore).set("login", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 2, 
    });

    return NextResponse.json(
      { message: status.OK.message },
      { status: status.OK.code }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
