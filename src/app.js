import express from "express";
import cors from 'cors'
import routes from "./routers";
import {dbConnect} from './config/db.config'
const app = express();
import { json } from 'express'
import fileUploader from 'express-fileupload'
const PORT=process.env.PORT || 5000;


app.use(cors());
app.use(json())
app.use(fileUploader({ useTempFiles: true }))

dbConnect()

app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Server has started!");
});


module.exports = app

