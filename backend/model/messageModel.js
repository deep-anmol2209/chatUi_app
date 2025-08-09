const mongoose= require("mongoose")

const messageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  message_id: {
    type: String,
    required: true,
    unique: true,
  },
  from: String,
  to: String,
  message: String,
  type: {
    type: String,
    enum: ['text', 'image', 'document', 'audio', 'video'],
    default: 'text',
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },
  timestamp: {
    type: Date,
    required: true,
  }
}, { timestamps: true });

module.exports= mongoose.model('Message', messageSchema)