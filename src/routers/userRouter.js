import express from 'express'
import {createNewUser,LoginUser,getUserInfo} from '../controllers/userController'
const router = express.Router()
router.post('/login',LoginUser)
router.post('/signUp',createNewUser)
module.exports=router