import express from "express";
import multer from "multer";
import signupRouter from "api/routes/signup";
import { cors } from "utils/middleware/cors";
import { configureCloudinary } from "frameworks/cloudinary/helper";
import * as dotenv from "dotenv";
import { connectAndListen } from "database";

dotenv.config();
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

configureCloudinary();

app.use(upload.any());
app.use(cors);

app.use("/", signupRouter);

connectAndListen(app);
