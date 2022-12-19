import express from "express";
import {getAllArticles} from "../controllers/articleController"
const router = express.Router();
import { protect } from "../middleware/authoMiddlewares";
router.get("/",protect,getAllArticles)


module.exports = router;