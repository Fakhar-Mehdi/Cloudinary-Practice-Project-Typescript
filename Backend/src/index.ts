import express from "express";
import multer from "multer";
import signupRouter from "api/routes/signup";
import { cors } from "utils/middleware/cors";
import error from "utils/middleware/error";
import { configureCloudinary } from "frameworks/cloudinary/helper";
import { connectAndListen } from "services/database/helper";

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

configureCloudinary();

app.use(upload.any());
app.use(cors);

app.use("/", signupRouter);
app.use(error);

connectAndListen(app);
