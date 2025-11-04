import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import status from "../../../../../utils/status";
import Comment from "../../../../../models/Comment.models";

export async function POST(req) {
  await connectDB();

  try {
    const {id} = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { message: status.FORBIDDEN.message },
        { status: status.FORBIDDEN.code }
      );
    }

      await Comment.findOneAndDelete({_id : id});
    //  console.log(deletedComment)


    return NextResponse.json(
      { message: status.OK.message },
      { status: status.OK.code }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
