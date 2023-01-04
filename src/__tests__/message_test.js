

import mongoose from 'mongoose' 
mongoose.Promise = global.Promise
import supertest from 'supertest'
import Message from "../models/message";
const cloudinary=require('cloudinary').v2;
import dotenv from 'dotenv';
import app from '../app';
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
dotenv.config();
import User from '../models/userModel'


const baseURL = process.env.BASE_URL
const testingMessage={
    name:"John Doe",
    email:"john@gmail.com",
    message:"testing message"
}

const admin={
    email:'admin@gmail.com',
    password:'123456'
}
const tester = {
    username: 'James',
      email: 'admin1@gmail.com',
      password: '123456'
  
  };

chai.expect();
chai.use(chaiHttp);
jest.setTimeout(50000)
describe('Testing message routes',()=>{
    beforeAll(async()=>{
        await User.deleteMany()
        // await chai.request(app).post('/api/account/signUp').send((tester));
    })
    beforeEach(async()=>{

        await chai.request(app).post('/api/account/signUp').send((tester));
    })
    afterEach(async()=>{
        await Message.deleteMany()
    }),
    afterAll(async()=>{
      await User.deleteMany()
    })

  
    it('should send message',async()=>{
        const res= await chai.request(app).post('/api/message/sendMessage').send(testingMessage)
        expect(res.status).to.be.equal(200);
    })
    it('should get all messages',async()=>{
       const adminSignin=await chai.request(app).post('/api/account/login').send(admin)
        const token = `Bearer ${adminSignin.body.user.token}`;
  
        const res= await chai.request(app).get('/api/message/').set('Authorization', token)
    
        expect(res.status).to.be.equal(200);

   
    })

})