import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import signupRouter from "api/routes/signup";
import { configureCloudinary } from "utils/helper";
import { cors } from "utils/middleware/cors";
import error from "utils/middleware/error";

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

configureCloudinary();

app.use(upload.any());
app.use(cors);

app.use("/", signupRouter);
app.use(error);
const port = 3001;

mongoose
  .connect("mongodb://127.0.0.1:27017/img-upload")
  .then(() => {
    console.log("Successfully connected to mongodb");
    app.listen(port, () => {
      console.log("Successfully listening to port: ", port);
    });
  })
  .catch((e) => console.log("Unable to connect to mongodb\nERROR: ", e));
