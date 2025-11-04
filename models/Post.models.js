
import { Schema, model, models, Types } from "mongoose";

const PostSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  title: String,
  content: String,
  url: String,
  type: {
    type: String,
    enum: ["text", "image", "video"],
    required: true,
  },
  tags: [String],
  isRetweet: { type: Boolean, default: false },
  retweetOf: {
    type: Types.ObjectId,
    ref: "Post",
    default: null,
  },
  countRepost:{type:Number , default :0},
  views: { type: Number, default: 0 },
  isPinned: { type: Boolean, default: false },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  saved: [{ type: Types.ObjectId, ref: "User" }],
  upvotes: { type: Number, default: 0 },
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
