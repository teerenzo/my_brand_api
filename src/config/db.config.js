import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// const { MONGO_URL } = process.env;

exports.dbConnect = () => {
  mongoose
    .connect("mongodb+srv://tee:QIRn5zlICWEVb6Xj@test.nfjw6px.mongodb.net/test", {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {console.log('Connected to DB')});
};