import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// const { MONGO_URL } = process.env;

exports.dbConnect = () => {
  mongoose
    .connect("mongodb+srv://alain:kabebe22@cluster0.ax3p6.mongodb.net/my_brand_test?retryWrites=true&w=majority", {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {console.log('Connected to DB')});
};