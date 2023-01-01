import supertest from 'supertest'
import User from '../models/userModel'

import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL




const tester = {
  username: 'James',
	email: 'admin@gmail.com',
	password: '123456'

};

describe('Testing Auth routes', () => {
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
		expect(res.status).toEqual(201);
	});
	it('should login user.', async () => {
        const user = await supertest(baseURL).post('account/signUp').send(tester);
		const res = await supertest(baseURL).post('account/login').send({email:user.email,password:user.password});
		expect(res.status).toEqual(200);
	});
});

