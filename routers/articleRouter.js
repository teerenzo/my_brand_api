const express = require("express");
const {getAllArticles} = require("../controllers/articleController")
const router = express.Router();
const { protect } = require("../middleware/authoMiddlewares");
router.get("/",protect,getAllArticles)


module.exports = router;