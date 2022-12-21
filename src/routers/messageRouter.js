import express from "express";
import { sendMessage,getAllMessages,deleteMessage} from "../controllers/messageController"
const router = express.Router();
import passport from "passport";
import '../middleware/passport'
router.get("/",passport.authenticate("jwt", { session: false }),getAllMessages)
router.post("/sendMessage",sendMessage)
router.delete("/:id/delete",passport.authenticate("jwt", { session: false }),deleteMessage)


module.exports = router;