import mongoose from 'mongoose' 
mongoose.Promise = global.Promise
import supertest from 'supertest'
const baseURL = "http://localhost:5000/api/"
import User from '../models/userModel'
mongoose.connect ( 'mongodb://localhost/acmedb', {
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
		// expect(res.body).toEqual('object');
	});
	it('should login user.', async () => {
        const user = await supertest(baseURL).post('account/signUp').send(tester);
		const res = await supertest(baseURL).post('account/login').send({email:user.email,password:user.password});
		expect(res.status).toEqual(200);
		// expect(res.body).toBe('object');
	});
});

// it("should throw an error if the password value is empty", async () => {
//     try {
     
//       await new User({
//         username: "sam",
//         email: "sam@ed.info",
//         password: ""
//       }).save()
//     } catch (err) {
//       expect(err.errors.password.message).toEqual("Please add a password")
//     }
//   })

//   it("should throw an error if the email value is empty", async () => {
//     try {
     
//       await new User({
//         username: "sam",
//         email: "",
//         password: "123456"
//       }).save()
//     } catch (err) {
//       expect(err.errors.email.message).toEqual("Please add a email")
//     }
//   })

//   it("should create account",async()=>{
    
//       const create = {
//         username: "teerenzo",
//         email: "renzaho23000@gmail.com",
//         password: "123456"
//       }
//   const result = await supertest(baseURL).post('account/signUp').send(create)
//   // console.log(result.body.success);Í
//       expect(result.body.success).toEqual(true)

  


//   })

//   it("should user login",async()=>{
    
//     const create = {
//       username: "teerenzo",
//       email: "renzaho23000@gmail.com",
//       password: "123456"
//     }
// const result = await supertest(baseURL).post('account/signUp').send(create)
// // console.log(result.body.success);Í
//     expect(result.body.success).toEqual(true)




// })



// afterAll( async ()=>{
//     try {
//         await mongoose.connection.close()
//       } catch (err) {
//         console.log(err)
//       }
    
// })