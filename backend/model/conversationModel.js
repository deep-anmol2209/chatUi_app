const mongoose= require("mongoose")

const conversationSchema = new mongoose.Schema({
  wa_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  ],
  last_updated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports= mongoose.model('Conversation', conversationSchema);