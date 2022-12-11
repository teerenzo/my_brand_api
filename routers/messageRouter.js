const express = require("express");
const { sendMessage,getAllMessages,deleteMessage} = require("../controllers/messageController")
const router = express.Router();
const { protect } = require("../middleware/authoMiddlewares");
router.get("/messages",protect,getAllMessages)
router.post("/sendMessage",sendMessage)
router.delete("/delete/:id",protect,deleteMessage)


module.exports = router;