import { Schema, model, Types } from 'mongoose';

const BlockSchema = new Schema({
  blocker: { type: Types.ObjectId, ref: 'User' },
  blocked: { type: Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const Block = model('Block', BlockSchema);
export default Block;