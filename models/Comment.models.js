import { Schema, models, model, Types } from 'mongoose';

const CommentSchema = new Schema({
  content: String,
  post: { type: Types.ObjectId, ref: 'Post', required: true },
  user: { type: Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Types.ObjectId, ref: 'User' }], 
  isReply: { type: Boolean, default: false },
  replyTo: { type: Types.ObjectId, ref: 'Comment' },
  createdAt: { type: Date, default: Date.now },
});

const Comment = models.Comment || model('Comment', CommentSchema);
export default Comment;
