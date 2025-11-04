import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String },
    type: {
      type: String,
      enum: ["text", "image", "video", "audio", "pdf"],
      default: "text",
    },
    url: { type: String },
    isEdited: { type: Boolean, default: false },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ChatMessage = mongoose.models.ChatMessage || mongoose.model("ChatMessage", MessageSchema);
export default ChatMessage;
