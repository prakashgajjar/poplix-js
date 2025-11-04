import { Schema, models, model, Types } from "mongoose";

const MessageSchema = new Schema({
  content: String,
  sender: { type: Types.ObjectId, ref: "User" },
  receiver: { type: Types.ObjectId, ref: "User" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Fix: reuse existing model if already compiled
const Message = models.Message || model("Message", MessageSchema);

export default Message;
