
import { NextResponse } from "next/server";
import Post from "../../../../models/Post.models";
import connectDB from "../../../../lib/db";
import status from "../../../../utils/status";

export async function GET() {
  await connectDB();

  try {
    const recentPosts = await Post.find({}).sort({ createdAt: -1 }).limit(100);

    const hashtagCounts = {} ;

    for (const post of recentPosts) {
      const hashtags = post.content?.match(/#[a-zA-Z0-9_]+/g);
      if (hashtags) {
        for (const tag of hashtags) {
          const cleanTag = tag.toLowerCase();
          hashtagCounts[cleanTag] = (hashtagCounts[cleanTag] || 0) + 1;
        }
      }
    }

    const trending = Object.entries(hashtagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag, count]) => ({ tag, count }));

    return NextResponse.json(
      { message: status.OK.message, trending },
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
