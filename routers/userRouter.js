const express = require('express')
const {createNewUser,LoginUser,getUserInfo} = require('../controllers/userController')
const router = express.Router()

router.post('/login',LoginUser)
router.post('/signUp',createNewUser)

module.exports=router