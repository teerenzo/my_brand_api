import mongoose from 'mongoose' 
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
mongoose.Promise = global.Promise
import User from '../models/userModel'

const app =require('../app');
import dotenv from 'dotenv';

dotenv.config();


chai.expect();
chai.use(chaiHttp);

mongoose.connect ( 'mongodb+srv://tee:QIRn5zlICWEVb6Xj@test.nfjw6px.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
mongoose.connection.on( 'error', () => {
  throw new Error(`unable to connect to database: `)
})
mongoose.set('strictQuery', true);

const tester = {
  username: 'James',
	email: 'admin@gmail.com',
	password: '123456'

};

describe('Testing Auth routes', () => {
   
  

  beforeAll(async () => {
await User.deleteMany();
});
	beforeEach(async () => {
		await User.deleteMany({
			where: { email: { $not: ['admin@gmail.com'] } },
		});
	});
  it("should throw an error if the password value is empty", async () => {
    try {
     
      await new User({
        username: "sam",
        email: "sam@ed.info",
        password: ""
      }).save()
    } catch (err) {
      expect(err.errors.password.message).equal("Please add a password")
    }
  })

  it("should throw an error if the email value is empty", async () => {
    try {
     
      await new User({
        username: "sam",
        email: "",
        password: "123456"
      }).save()
    } catch (err) {
      expect(err.errors.email.message).equal("Please add a email")
    }
  })
	it('should register a user.', async () => {
		const res = await chai.request(app).post('/api/account/signUp').send((tester));
    console.log(res.body)
		expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
	});
	it('should login user.', async () => {
    // jest.setTimeout(10000);
        const user = await chai.request(app).post('/api/account/signUp').send(tester);
		const res = await chai.request(app).post('/api/account/login').send({email:user.email,password:user.password});
    expect(res.status).to.be.equal(200);
	});
});

