import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// const { MONGO_URL } = process.env;

exports.dbConnect = () => {
  mongoose
    .connect(process.env.NODE_ENV === 'production'
    ? process.env.MONGO_PROD_URL
    : process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST_URL
    : process.env.MONGO_DEV_URL, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {console.log('Connected to DB')});
};