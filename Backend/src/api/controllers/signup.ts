import { Response } from "express";
import User from "models/user";
import { throwException, throwForNoExistence } from "utils/helper";
import {
  uploadFileToCloudinary,
  validateUserInfo,
} from "frameworks/cloudinary/helper";

export const addUser = async (req: any, res: Response) => {
  const { name, email, age } = req.body;
  const profilePicture = req.files[0];
  await validateUserInfo({ name, email, age, profilePicture });
  const secureUrl = await uploadFileToCloudinary(profilePicture);
  const newUser = new User({ name, email, age, dp: secureUrl });
  res.status(400);
  await newUser.save();
  res.status(200);
  console.log(`A new user added with ${email}`);
  res.send(newUser);
};
