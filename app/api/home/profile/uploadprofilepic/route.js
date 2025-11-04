import { NextResponse } from "next/server";
import User from "../../../../../models/User.models";
import connectDB from "../../../../../lib/db";
import status from "../../../../../utils/status";
import cloudinary from "../../../../../lib/cloudinary";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";


export async function POST(req) {
  await connectDB();

  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json(
      { message: status.NOT_FOUND.message },
      { status: status.NOT_FOUND.code }
    );
  }

  const formData = await req.formData();
  const file = formData.get("profilePic");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "poplix/profilePic",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: uploadResult.secure_url },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    return NextResponse.json(
      { message: status.OK.message, user },
      { status: status.OK.code }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
