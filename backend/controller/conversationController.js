const Conversation = require("../model/conversationModel.js")
const message = require ("../model/messageModel.js")
 const listConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .populate({
        path: 'messages',
        options: { sort: {  _id: -1 } }
      })
      .sort({ last_updated: -1 });
      //  console.log(conversations);
    
       
    const result = conversations.map(convo => {
      const lastMsg = convo.messages[0] || {};
      console.log('Populated messages:', convo.messages);
      return {
        wa_id: convo.wa_id,
        name: convo.name,
        last_message: lastMsg.message || '',
        last_status: lastMsg.status || '',
        last_timestamp: lastMsg.timestamp || convo.last_updated
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error('Error listing conversations:', err);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};
module.exports= listConversations