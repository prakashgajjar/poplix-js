import { Schema, model, Types } from 'mongoose';
const MessageSchema = new Schema({
  content: String,
  sender: { type: Types.ObjectId, ref: 'User' },
  receiver: { type: Types.ObjectId, ref: 'User' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Message = model('Message', MessageSchema);
export default Message;