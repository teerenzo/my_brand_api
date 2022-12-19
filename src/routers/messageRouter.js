import express from "express";
import { sendMessage,getAllMessages,deleteMessage} from "../controllers/messageController"
const router = express.Router();
import { protect } from "../middleware/authoMiddlewares";
router.get("/messages",protect,getAllMessages)
router.post("/sendMessage",sendMessage)
router.delete("/delete/:id",protect,deleteMessage)


module.exports = router;