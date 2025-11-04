import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.AiChatMessage || mongoose.model('AiChatMessage', chatMessageSchema);
