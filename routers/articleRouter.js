const express = require("express");
const {getAllArticles,createNewArticle,commentingOnArticle,likeArticle,deleteArticle,updateArticle} = require("../controllers/articleController")
const router = express.Router();
const { protect } = require("../middleware/authoMiddlewares");
router.get("/",protect,getAllArticles)

router.post("/add",protect,createNewArticle)

router.post("/comment",protect,commentingOnArticle)
router.post("/like",protect,likeArticle)
router.delete("/delete/:id",protect,deleteArticle)
router.put("/update/:id",protect,updateArticle)




module.exports = router;