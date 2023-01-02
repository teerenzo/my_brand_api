import express from "express";
import cors from 'cors'
import routes from "./routers";
// import { dbConnect } from './config/db.config'
import mongoose from 'mongoose';
const app = express();
import { json } from 'express'
import fileUploader from 'express-fileupload'
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(json())
app.use(fileUploader({ useTempFiles: true }))


// dbConnect()

app.use("/api", routes);

mongoose
  .connect("mongodb+srv://alain:kabebe22@cluster0.ax3p6.mongodb.net/my_brand_test?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to DB')

    app.listen(PORT, () => {

      console.log("Server has started!");
    })
  });


module.exports = app

