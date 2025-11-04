import mongoose from "mongoose";
const { Schema, model, models, Types } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    fullname: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true },
    otp: {
      type: String,
      required: false,
      default: null,
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dsndcjfwh/image/upload/v1751186203/poplix/profilePic/naegnaxdu8uvuj9s6k2a.png",
    },
    banner: {
      type: String,
      default:
        "https://res.cloudinary.com/dsndcjfwh/image/upload/v1750850806/poplix/banners/obhxuos1lhbeqwexy93q.jpg",
    },
    bio: String,
    phone: { type: String, unique: true, sparse: true },
    website: String,
    gender: String,
    birthday: Date,

    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "DELETED"],
      default: "ACTIVE",
    },
    profil: {
      type: String,
      enum: ["PRIVATE", "PUBLIC"],
      default: "PUBLIC",
    },

    posts: [{ type: Types.ObjectId, ref: "Post" }],
    comments: [{ type: Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Types.ObjectId, ref: "User" }],
    followers: [{ type: Types.ObjectId, ref: "User" }],
    following: [{ type: Types.ObjectId, ref: "User" }],
    pending: [{ type: Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: Types.ObjectId, ref: "User" }],
    blockedBy: [{ type: Types.ObjectId, ref: "User" }],
    savedPosts: [{ type: Types.ObjectId, ref: "Post" }],
    notifications: [{ type: Types.ObjectId, ref: "Notification" }],
    messagesSent: [{ type: Types.ObjectId, ref: "Message" }],
    messagesReceived: [{ type: Types.ObjectId, ref: "Message" }],
    contacts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    isOnline: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
