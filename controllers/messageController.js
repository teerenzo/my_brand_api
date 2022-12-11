const { messageSchema } = require("../helpers/validation");
const Message = require("../models/message")

const sendMessage=async (req,res)=>{
  try {
    const valationResult = await messageSchema.validateAsync(req.body);
    const message=new Message({
        name:valationResult.name,
        email:valationResult.email,
        message:valationResult.message
    })
    message.save()
    .then(result=>{
        res.status(200).json({message:'message sent successful'})
    })
  } catch (error) {
      res.status(500).json({error})
  }
}

const getAllMessages=async (req,res)=>{
    console.log(req.body['role'])
    if(req.body['role'].toString()=='admin')
        {
    Message.find()
    .then(messages=>{
        res.json({messages})
    })
    .catch(error=>res.json(error))
}else
{
    res.json({message:'User Not Authorized'}).status(401)
}

}
const deleteMessage=(req,res)=>{
const {id}=req.params
Message.deleteOne({_id:id})
.then(result=>{
    console.log(result)
    res.status(200).json(result)
})
.catch(error=>console.log(error))
}

module.exports={
    sendMessage,getAllMessages,deleteMessage
}