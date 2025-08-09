const Conversation = require('../model/conversationModel');
const { v4: uuidv4 } = require('uuid');

const Message = require("../model/messageModel")
 const getConversationMessages = async (req, res) => {
  try {
    const { wa_id } = req.params;

    // Find the conversation by wa_id and populate messages
    const conversation = await Conversation.findOne({ wa_id })
      .populate({
        path: 'messages',
      
      });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Send back only messages array
    res.status(200).json({
      wa_id: conversation.wa_id,
      name: conversation.name,
      messages: conversation.messages
    });

  } catch (err) {
    console.error('Error fetching conversation messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const sendMessage= async(req, res)=>{
console.log(req.body);

  const {wa_id, message, from}= req.body;

  const conv= await Conversation.findOne({wa_id: wa_id})
  if(!conv){
    return res.status(400).json({
      message:"conversation not found whith the given id",
      success: false})
  }

 
  const msgId = uuidv4();
  
    const result = await Message.create({
      conversation: conv._id,
      message_id: msgId,
      from,
      to: 'customer',
      message: message,
      type: 'text',
      status: 'sent',
      timestamp: new Date().toISOString()
    });

  await result.save()
   // 🧩 Push message to conversation
   await Conversation.updateOne(
    { _id: conv._id },
    {
      $push: { messages: result._id },
      $set: { last_updated: new Date().toISOString() }
    }
  );

}

module.exports = {getConversationMessages, sendMessage}