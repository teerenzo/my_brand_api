// import mongoose from 'mongoose' 
// mongoose.Promise = global.Promise
// import chai from 'chai';
// import { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import path from 'path'
// import Sinon from 'sinon'

// const app =require('../app');
// import Article from '../models/article'

// import cloudinary from '../config/cloudinary';

// import dotenv from 'dotenv';

// dotenv.config();


// chai.expect();
// chai.use(chaiHttp);

// const baseURL = process.env.BASE_URL



// mongoose.connect ( process.env.NODE_ENV === 'production'
// ? process.env.MONGO_PROD_URL
// : process.env.NODE_ENV === 'test'
// ? process.env.MONGO_TEST_URL
// : process.env.MONGO_DEV_URL, {
//     useNewUrlParser: true
// })
// mongoose.connection.on( 'error', () => {
//   throw new Error(`unable to connect to database: `)
// })
// mongoose.set('strictQuery', true);

// const testingData={
//     title:'testing article title',
//     content:'testing article content',
// }
// const testingDataUpdate={
//     title:'testing article title update',
//     content:'testing article content update',
//     image:''

// }

// const admin={
//     email:'admin@gmail.com',
//     password:'123456'
// }


// describe('Testing Blog routes', () => {
//     const sandbox = Sinon.createSandbox();
//     beforeAll(async () => {
//         sandbox.stub(cloudinary, 'upload').resolves({
//             url: 'wazaa',
//           });
// 		// await Article.deleteMany();
// 	});

//     afterAll(async () => {
// 		// await Article.deleteMany();
// 	});

//     it('should create new blog article.',async()=>{

//         const adminSignin=await chai.request(app).post('/api/account/login').send(admin)
//         const token = `Bearer ${adminSignin.body.user.token}`;
  
//         const res=await chai.request(app).post('/api/articles/add').field('title',testingData.title).field('content',testingData.content).attach("photo",path.resolve(__dirname,'./mock/tee.jpg')).set('Authorization', token)
//         console.log(res.status);
//         expect(res.status).toEqual(200);
//     })
//     ,
//     it('should get all blog articles.',async()=>{

//         const res=await chai.request(app).get('/api/articles/')
//         expect(res.status).to.be.equal(200);
       
//     }),
//     it('should get one blog article by id',async()=>{
//         const article=await chai.request(app).get('/api/articles/')
//         const id=article.body[0]._id
//         const res=await chai.request(app).get(`/api/articles/${id}`)
//         expect(res.status).to.be.equal(200);
//     })
//     it('should update blog article',async()=>{
//         const adminSignin=await chai.request(app).post('/api/account/login').send(admin)
//         const token = `Bearer ${adminSignin.body.user.token}`;
//         const res1=await chai.request(app).post('/api/articles/add').send(testingData).set('Authorization', token)
//         const article=await chai.request(app).get('/api/articles/')
//         const id=article.body[0]._id
       
//         const res=await chai.request(app).put(`/api/articles/${id}/update`).send(testingDataUpdate).set('Authorization', token)
   
//         expect(res.status).to.be.equal(200);
//     })
//     it('should delete blog article',async()=>{
//         const adminSignin=await chai.request(app).post('/api/account/login').send(admin)
//         const token = `Bearer ${adminSignin.body.user.token}`;
//         const article=await chai.request(app).get('/api/articles/')

//         const id=article.body[0]._id
//         const res=await chai.request(app).delete(`/api/articles/${id}`).set('Authorization', token)
      
//         expect(res.status).to.be.equal(200);

  
//     }),
//     it('should comment on blog article',async()=>{
//         const adminSignin=await chai.request(app).post('/api/account/login').send(admin)
//         const token = `Bearer ${adminSignin.body.user.token}`;
//         const article=await chai.request(app).get('/api/articles/')
//         const id=article.body[0]._id
//         const res=await chai.request(app).post(`/api/articles/${id}/comment/`).send(testingDataUpdate).set('Authorization', token).send({"comment":"that content is very helpful thanks"})
//         expect(res.status).to.be.equal(200);

//     })
//     it('should like on blog article',async()=>{
//         const adminSignin=await chai.request(app).post('/api/account/login').send(admin)
//         const token = `Bearer ${adminSignin.body.user.token}`;
//         const article=await chai.request(app).get('/api/articles/')
//         const id=article.body[0]._id
//         const res=await chai.request(app).post(`/api/articles/${id}/like`).send(testingDataUpdate).set('Authorization', token).send({"article_id":id})
//         expect(res.status).to.be.equal(200);

//     })
// })