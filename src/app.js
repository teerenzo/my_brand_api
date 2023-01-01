import express from "express";
import cors from 'cors'
import routes from "./routers";
import {dbConnect} from './config/db.config'
const app = express();
import { json } from 'express'
import fileUploader from 'express-fileupload'



app.use(cors());
app.use(json())
app.use(fileUploader({ useTempFiles: true }))

dbConnect()

app.use("/api", routes);

app.listen(5000, () => {
  console.log("Server has started!");
});

