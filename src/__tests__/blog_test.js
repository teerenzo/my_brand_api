import mongoose from 'mongoose' 
mongoose.Promise = global.Promise
import supertest from 'supertest'
import path from 'path'
import Sinon from 'sinon'

import Article from '../models/article'

import cloudinary from '../config/cloudinary';

import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL



mongoose.connect ( process.env.MONGO_TEST_URL, {
    useNewUrlParser: true
})
mongoose.connection.on( 'error', () => {
  throw new Error(`unable to connect to database: `)
})
mongoose.set('strictQuery', true);

const testingData={
    title:'testing article title',
    content:'testing article content',
}
const testingDataUpdate={
    title:'testing article title update',
    content:'testing article content update',
    image:''

}

const admin={
    email:'admin@gmail.com',
    password:'123456'
}


describe('Testing Blog routes', () => {
    const sandbox = Sinon.createSandbox();
    beforeAll(async () => {
        sandbox.stub(cloudinary, 'upload').resolves({
            url: 'wazaa',
          });
		await Article.deleteMany();
	});

    afterAll(async () => {
		await Article.deleteMany();
	});

    it('should create new blog article.',async()=>{

        const adminSignin=await supertest(baseURL).post('account/login').send(admin)
        const token = `Bearer ${adminSignin.body.user.token}`;
  
        const res=await supertest(baseURL).post('/articles/add').field('title',testingData.title).field('content',testingData.content).attach("photo",path.resolve(__dirname,'./mock/tee.jpg')).set('Authorization', token)
        console.log(token);
        expect(res.status).toEqual(200);
    })
    it('should get all blog articles.',async()=>{

        const res=await supertest(baseURL).get('/articles/')
        expect(res.status).toEqual(200);
       
    }),
    it('should get one blog article by id',async()=>{
        const adminSignin=await supertest(baseURL).post('account/login').send(admin)
        const token = `Bearer ${adminSignin.body.user.token}`;
        const res1=await supertest(baseURL).post('/articles/add').send(testingData).set('Authorization', token)
        const article=await supertest(baseURL).get('/articles/')
        const id=article.body[0]._id
        const res=await supertest(baseURL).get(`/articles/${id}`)
        expect(res.status).toEqual(200)
    })
    it('should update blog article',async()=>{
        const adminSignin=await supertest(baseURL).post('account/login').send(admin)
        const token = `Bearer ${adminSignin.body.user.token}`;
        const res1=await supertest(baseURL).post('/articles/add').send(testingData).set('Authorization', token)
        const article=await supertest(baseURL).get('/articles/')
        const id=article.body[0]._id
       
        const res=await supertest(baseURL).put(`/articles/${id}/update`).send(testingDataUpdate).set('Authorization', token)
   
        expect(res.status).toEqual(200)
    })
    it('should delete blog article',async()=>{
        const adminSignin=await supertest(baseURL).post('account/login').send(admin)
        const token = `Bearer ${adminSignin.body.user.token}`;
        const article=await supertest(baseURL).get('/articles/')

        const id=article.body[0]._id
        const res=await supertest(baseURL).delete(`/articles/${id}`).set('Authorization', token)
      
        expect(res.status).toEqual(200)
  
    }),
    it('should comment on blog article',async()=>{
        const adminSignin=await supertest(baseURL).post('account/login').send(admin)
        const token = `Bearer ${adminSignin.body.user.token}`;
        const article=await supertest(baseURL).get('/articles/')
        const id=article.body[0]._id
        const res=await supertest(baseURL).post(`/articles/${id}/comment/`).send(testingDataUpdate).set('Authorization', token).send({"comment":"that content is very helpful thanks"})
        expect(res.status).toEqual(200)
    })
    it('should like on blog article',async()=>{
        const adminSignin=await supertest(baseURL).post('account/login').send(admin)
        const token = `Bearer ${adminSignin.body.user.token}`;
        const article=await supertest(baseURL).get('articles/')
        const id=article.body[0]._id
        const res=await supertest(baseURL).post(`articles/${id}/like`).send(testingDataUpdate).set('Authorization', token).send({"article_id":id})
        expect(res.status).toEqual(200)
    })
})