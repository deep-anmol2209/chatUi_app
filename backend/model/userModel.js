const mongoose= require("mongoose")

const userSchema = new mongoose.Schema({
  wa_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
}, { timestamps: true });

module.exports= mongoose.model('User', userSchema);