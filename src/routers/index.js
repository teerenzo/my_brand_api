import express from "express"
const router = express.Router()
import article from './articleRouter'
import user from './userRouter'
import message from './messageRouter'
router.use('/articles',article)
router.use('/account',user)
router.use('/message',message)

module.exports=router