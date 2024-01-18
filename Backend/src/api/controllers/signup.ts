import { createUser } from "api/useCases/user/createUser";
import { Response } from "express";
import { uploadFileToCloudinary } from "frameworks/cloudinary/helper";
import { validateUserInfo } from "utils/validation/userValidation";

export const addUser = async (req: any, res: Response) => {
  const { name, email, age } = req.body;
  const profilePicture = req.files[0];
  await validateUserInfo({ name, email, age, profilePicture });
  const secureUrl = await uploadFileToCloudinary(profilePicture);
  const newUser = await createUser({ name, email, age, dp: secureUrl });
  console.log(`A new user added with ${email}`);
  res.send(newUser);
};
