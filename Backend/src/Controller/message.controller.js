const Messages = require("../Model/messagemodel")
const express= require("express")
const router= express.Router()

router.post("/get", async (req, res) => {
    try {
    
        console.log(req.body)
      const messages = await Messages.find({users: {$all: [req.body.from, req.body.to], },
      }).sort({ updatedAt: 1 });
 
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === req.bodyfrom,
          message: msg.message.text,
        };
      });
      return res.json(projectedMessages);
    } catch (ex) {
      return res.send(ex.message)
    }
  })

router.post("/add",async (req, res) => {
    try {
      const { from, to, message } = req.body;
      const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });
  
      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        return res.send(ex.message)
    }
  })

  module.exports=router