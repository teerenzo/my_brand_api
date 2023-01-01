import mongoose from 'mongoose' 
mongoose.Promise = global.Promise
import supertest from 'supertest'
import User from '../models/userModel'

import dotenv from 'dotenv';

dotenv.config();

const baseURL = "http://localhost:5000/api/"



mongoose.connect ( process.env.NODE_ENV === 'production'
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

const tester = {
  username: 'James',
	email: 'admin@gmail.com',
	password: '123456'

};

describe('Testing Auth routes', () => {
   
  console.log(baseURL)

//   beforeAll(async () => {
// await User.deleteMany();
// });
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
      expect(err.errors.password.message).toEqual("Please add a password")
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
      expect(err.errors.email.message).toEqual("Please add a email")
    }
  })
	it('should register a user.', async () => {
		const res = await supertest(baseURL).post('account/signUp').send((tester));
    console.log(res.body)
		expect(res.status).toEqual(201);
	});
	it('should login user.', async () => {
    // jest.setTimeout(10000);
        const user = await supertest(baseURL).post('account/signUp').send(tester);
		const res = await supertest(baseURL).post('account/login').send({email:user.email,password:user.password});
		expect(res.status).toEqual(200);
	});
});

