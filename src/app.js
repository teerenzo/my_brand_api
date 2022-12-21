import express from "express";
import mongoose from "mongoose";
import routes from "./routers";
import cors from 'cors'
const app = express();
const { json } = require('express')
const fileUploader=require('express-fileupload')
import passport from "passport";
mongoose.set('strictQuery', true)
mongoose
  .connect("mongodb://127.0.0.1:27017/acmedb", { useNewUrlParser: true })
  .then(() => {

    app.use(express.json());
    app.use("/api", routes);
    app.use(cors());
    app.use(json())
    app.use(fileUploader({useTempFiles: true}))
  
  // passports
    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
  