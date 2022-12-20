import express from "express";
import mongoose from "mongoose";
import routes from "./routers";
import passports from './middleware/passport';
const app = express();
import passport from "passport";
mongoose.set('strictQuery', true)
mongoose
  .connect("mongodb://127.0.0.1:27017/acmedb", { useNewUrlParser: true })
  .then(() => {

    app.use(express.json());
    app.use("/api", routes);
  
  // passports
    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
  