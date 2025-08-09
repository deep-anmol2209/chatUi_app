const express= require("express")
const {getConversationMessages, sendMessage}= require("../controller/messageController.js")
const router= express.Router();

router.get('/:wa_id/messages', getConversationMessages);
router.post("/send", sendMessage )
  

module.exports = router