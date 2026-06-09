export const runtime = "nodejs";
import cloudinary from "../../../../../lib/cloudinary";
import { NextResponse } from "next/server";
import Post from "../../../../../models/Post.models";
import User from "../../../../../models/User.models";
import { getUserIdFromToken } from "../../../../../lib/getUserIdfromToken";
import connectDB from "../../../../../lib/db.js";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("post");
    const content = formData.get("content");
    await connectDB();

    // console.log(formData);

    if (!file && !content) {
      return NextResponse.json(
        { error: "No content or file uploaded" },
        { status: 400 },
      );
    }

    const userId = await getUserIdFromToken();
    const user = await User.findById(userId);

    let uploadResult = null;
    let type = "text";

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      try {
        uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "poplix/posts",
                resource_type: "auto",
              },
              (err, result) => {
                if (err) return reject(new Error("Cloudinary Upload Failed"));
                resolve(result);
              },
            )
            .end(buffer);
        });

        // console.log(uploadResult);
      } catch (err) {
        return NextResponse.json(
          { error: "Media upload failed." },
          { status: 500 },
        );
      }

      type = uploadResult?.resource_type === "video" ? "video" : "image";
    }
    console.log("Cloudinary Upload Success");

    const newPost = await Post.create({
      user: userId,
      content,
      url: uploadResult?.secure_url || null,
      type,
    });

    console.log("Post Created:", newPost._id);

    user.posts.push(newPost._id);

    console.log("Saving User");

    await user.save();

    console.log("User Saved");

    return NextResponse.json(
      {
        message: "Post created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("POST /sendpost error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
