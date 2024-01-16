import asyncHandler from "utils/middleware/asyncHandler";
import { addUser } from "../controllers/signup";
import express, { Request, Response } from "express";

const signupRouter = express.Router();

signupRouter.post("/saveCredentials", asyncHandler(addUser));
signupRouter.get("/", (req: Request, res: Response) => {
  res.send("CloudinaryPracticeProject-Backend is Live");
});

export default signupRouter;
