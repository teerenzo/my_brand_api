const express = require("express")
const router = express.Router()
const article=require('./articleRouter')
const user=require('./userRouter')
const message=require('./messageRouter')
router.use('/articles',article)
router.use('/account',user)
router.use('/message',message)

module.exports=router