import express from "express";
import cors from 'cors'
import routes from "./routers";
import {dbConnect} from './config/db.config'
const app = express();
import { json } from 'express'
import fileUploader from 'express-fileupload'
import docsRouter from './api_documentation/index.doc';
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT || 5000;



dbConnect()

app.use(cors());
app.use(json())
app.use(fileUploader({ useTempFiles: true }))



app.use("/api", routes);
app.use('/api/docs',docsRouter)


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT);
}

// app.listen(PORT, ()  => {

//   console.log("Server has started!");
// });


module.exports = app

