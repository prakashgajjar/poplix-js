import { Schema, model, Types, models } from "mongoose";

const NotificationSchema = new Schema(
  {
    recipient: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: [
        "like",
        "comment",
        "repost",
        "follow",
        "mention",
        "reply",
        "system",
      ],
      required: true,
    },
    post: {
      type: Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: Types.ObjectId,
      ref: "Comment",
    },
    message: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    meta: {
      type: Object, // for future flexible data
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const Notification =
  models.Notification || model("Notification", NotificationSchema);
