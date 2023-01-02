import express from "express";
import cors from 'cors'
import routes from "./routers";
// import { dbConnect } from './config/db.config'
import mongoose from 'mongoose';
const app = express();
import { json } from 'express'
import fileUploader from 'express-fileupload'
const PORT = process.env.PORT || 5000;

import dotenv from 'dotenv';

dotenv.config();

app.use(cors());
app.use(json())
app.use(fileUploader({ useTempFiles: true }))


// dbConnect()

app.use("/api", routes);

mongoose
  .connect(process.env.NODE_ENV === 'production'
  ? process.env.MONGO_PROD_URL
  : process.env.NODE_ENV === 'test'
  ? process.env.MONGO_TEST_URL
  : process.env.MONGO_DEV_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to DB')

    app.listen(PORT, () => {

      console.log("Server has started!");
    })
  });


module.exports = app

