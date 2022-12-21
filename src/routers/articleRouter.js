import express from "express";


import {getAllArticles,createNewArticle,commentingOnArticle,likeArticle,deleteArticle,updateArticle,getOneArticle} from "../controllers/articleController"

const router = express.Router();
import { protect } from "../middleware/authoMiddlewares";
router.get("/",getAllArticles)
router.get("/:id",getOneArticle)

router.post("/add",protect,createNewArticle)

router.post("/:article_id/comment",protect,commentingOnArticle)
router.post("/:article_id/like",protect,likeArticle)
router.delete("/:id",protect,deleteArticle)
router.put("/:id",protect,updateArticle)




module.exports = router;