import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  avatar: String, // group icon or cover photo

  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["admin", "member"], default: "member" },
      joinedAt: { type: Date, default: Date.now },
    },
  ],

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }, // link to chat messages
}, { timestamps: true });

export default mongoose.model("Group", GroupSchema);
