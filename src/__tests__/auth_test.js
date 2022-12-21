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

  it("should create account",async()=>{
    
      const create = {
        username: "teerenzo",
        email: "renzaho3000@gmail.com",
        password: "123456"
      }
  const result = await supertest(baseURL).post('account/signUp').send(create)
  // console.log(result.body.success);Í
      expect(result.body.success).toEqual(true)

  


  })



afterAll( async ()=>{
    try {
        await mongoose.connection.close()
      } catch (err) {
        console.log(err)
      }
    
})