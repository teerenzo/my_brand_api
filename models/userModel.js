const mongoose = require("mongoose")

const schema = mongoose.Schema({
    username:{
        type: String,
        required:[true,'Please add a name'],
    },
    email:{
        type: String,
        required:[true,'Please add a email'],
        unique:true
    },
    password:{
        type: String,
        required:[true,'Please add a password'],
    },
    role:{
        type: String,
        required:[true,'Please add a role'],
    },
})

module.exports=mongoose.model('User',schema)