import express from "express";


import {getAllArticles,createNewArticle,commentingOnArticle,likeArticle,deleteArticle,updateArticle,getOneArticle} from "../controllers/articleController"

const router = express.Router();
import passport from "passport";
import '../middleware/passport'
router.get("/",getAllArticles)
router.get("/:id",getOneArticle)

router.post("/add",passport.authenticate("jwt", { session: false }),createNewArticle)

router.post("/:article_id/comment",passport.authenticate("jwt", { session: false }),commentingOnArticle)
router.post("/:article_id/like",passport.authenticate("jwt", { session: false }),likeArticle)
router.delete("/:id",passport.authenticate("jwt", { session: false }),deleteArticle)
router.put("/:id/update",passport.authenticate("jwt", { session: false }),updateArticle)




module.exports = router;