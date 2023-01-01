

import mongoose from 'mongoose' 
mongoose.Promise = global.Promise
import supertest from 'supertest'
import Message from "../models/message";
const cloudinary=require('cloudinary').v2;
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL



mongoose.connect (process.env.NODE_ENV === 'production'
? process.env.MONGO_PROD_URL
: process.env.NODE_ENV === 'test'
? process.env.MONGO_TEST_URL
: process.env.MONGO_DEV_URL, {
    useNewUrlParser: true
})
mongoose.connection.on( 'error', () => {
  throw new Error(`unable to connect to database: `)
})
mongoose.set('strictQuery', true);


const testingMessage={
    name:"John Doe",
    email:"john@gmail.com",
    message:"testing message"
}

const admin={
    email:'admin@gmail.com',
    password:'123456'
}


describe('Testing message routes',()=>{
    beforeEach(async()=>{
        jest.setTimeout(10000);
        await Message.deleteMany()
    })
    afterEach(async()=>{
        await Message.deleteMany()
    }),
    it('should send message',async()=>{
        const res= await supertest(baseURL).post('message/sendMessage').send(testingMessage)
        expect(res.status).toEqual(200)
    })
    it('should get all messages',async()=>{
       const adminSignin=await supertest(baseURL).post('account/login').send(admin)
        const token = `Bearer ${adminSignin.body.user.token}`;
  
        const res= await supertest(baseURL).get('message/').set('Authorization', token)
    
        expect(res.status).toEqual(200)

   
    })

})