const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const tokenSecret = "my-token-secret"

exports.protect = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) res.status(403).json({error: "please provide a token"})
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'failed to authenticate token'})
            req.user = value.id
            next()
        })
    }
}

exports.isAuthorized = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) res.status(403).json({error: "please provide a token"})
    else {
        jwt.verify(token.split(" ")[1], tokenSecret,async (err, value) => {
            if (err) res.status(500).json({error: 'failed to authenticate token'})
            const {id}=value
            const user=await User.findOne({where:{id}})
            if(!user)
            { 
                return res.status(403).json({error:'Not allowed to perform this action'})
            }
            req.user =user
            next()
        })
    }
}