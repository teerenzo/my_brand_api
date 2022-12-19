import express from "express";
import mongoose from "mongoose";
import routes from "./src/routers";
const app = express();
// mongoose.set('strictQuery', true)
mongoose
  .connect("mongodb://127.0.0.1:27017/acmedb", { useNewUrlParser: true })
  .then(() => {

    app.use(express.json());
    app.use("/api", routes);

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
  