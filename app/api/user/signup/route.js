import { NextResponse } from "next/server";
import status from "../../../../utils/status";
import connectDB from "../../../../lib/db";
import User from "../../../../models/User.models";
import { sendOtpMail } from "../../../../lib/mailer";
import bcrypt from 'bcrypt';


export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { username, password, email, fullname } = body;
    if (!username || !password || !email || !fullname) {
      return NextResponse.json({
        status: status.BAD_REQUEST.code,
        error: status.BAD_REQUEST.message,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: status.CONFLICT.code,
        error: status.CONFLICT.message,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          console.error("Error hashing password:", err);
          return NextResponse.json({
            status: status.INTERNAL_ERROR.code,
            error: status.INTERNAL_ERROR.message,
          });
        }
        const newUser = new User({ username, password: hash, email, fullname, otp });

        await newUser.save();
      });
    });

    await sendOtpMail(email, otp);

    return NextResponse.json({
      status: status.CREATED.code,
      message: status.CREATED.message,
    });
  } catch (error) {
    console.error("Error in POST /login:", error);
    return NextResponse.json({
      status: status.INTERNAL_ERROR.code,
      error: status.INTERNAL_ERROR.message,
    });
  }
}
