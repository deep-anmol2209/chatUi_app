const express= require("express")
const listConversations= require("../controller/conversationController")

const router= express.Router();

router.get('/', listConversations );
router.get('/test', (req, res) => {
    res.send(" Test route working");
  });
  

module.exports= router