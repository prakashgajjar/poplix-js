import mongoose from "mongoose";
const ChatSchema = new mongoose.Schema({
  isGroup: { type: Boolean, default: false },
  name: String, // for groups
  groupId: {type: mongoose.Schema.Types.ObjectId, ref: "Group"},
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  groupAvatar: String,
  groupCover: String
}, { timestamps: true });

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
export default Chat;