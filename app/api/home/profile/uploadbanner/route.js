import { NextResponse } from "next/server";
import User from "../../../../../models/User.models";
import connectDB from "../../../../../lib/db";
import status from "../../../../../utils/status";
import cloudinary from "../../../../../lib/cloudinary";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";

export async function POST(req) {
  await connectDB();
  const userId = await getUserIdFromToken();
  console.log(userId)
  if (!userId) {
    return NextResponse.json(
      { message: status.NOT_FOUND.message },
      { status: status.NOT_FOUND.code }
    );
  }

  const formData = await req.formData();
  const file = formData.get("banner") ;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "poplix/banners",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    const { secure_url } = result;
    const user = await User.findOneAndUpdate({ _id: userId }, { banner: secure_url });
    await user.save();
    // console.log(user);
    if (!user) {
      NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }
    
    return NextResponse.json(
      { message: status.OK.message, user },
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
