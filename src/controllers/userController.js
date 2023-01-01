import { createUserSchema, loginUserSchema } from "../helpers/validation";
import User from '../models/userModel';
import  jwt from 'jsonwebtoken'
import bcrypt from'bcryptjs';


const createNewUser= async(req,res)=>{
    try {
        const valationResult = await createUserSchema.validateAsync(req.body);
        const userExist=await User.findOne({email:valationResult.email})
        if(userExist)
        res.status(400).json({"success":false,message:"user email already exist"})
        else{
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(valationResult.password,salt)
       const user=new User({
            username:valationResult.username,
            email:valationResult.email,
            password:hashedPassword,
            role:'admin'
        })
        user.save()
        .then(user=>res.status(201).json({"success":true,
        "user":{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        }}))
        .catch(err=>console.log(err))
    }
    } catch (error) {
        res.status(400).json({"success":false,message:error.message})
    }
}


const LoginUser=async (req,res)=>{
    try {
      const valationResult = await loginUserSchema.validateAsync(req.body);
      const {email,password}=valationResult
      const user=await User.findOne({email})
       if(user && (await bcrypt.compare(password,user.password)))
       {
           res.json({"success":true,user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            token:generateToken(user)
        }})
       }
       else res.json({"success":false,message:"Invalid credation"}).status(400)

    } catch (error) {
        res.json({"success":false,message:error}).status(400)
    }
}



// generate token 
const generateToken=(id)=>{
    return jwt.sign({id},"my-token-secret",{expiresIn:'30d'})
}

module.exports={
    createNewUser,LoginUser
}