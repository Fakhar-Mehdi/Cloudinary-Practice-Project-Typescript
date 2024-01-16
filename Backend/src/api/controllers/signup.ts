import { Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import User from "models/user";
import { throwException, throwForNoExistence } from "utils/helper";

const uploadFileToCloudinary = async (file: any) =>
  new Promise((resolve, reject) => {
    const cloudinaryResolveReject = (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    };
    const timestamp = Math.round(new Date().getTime() / 1000);
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", timestamp },
        cloudinaryResolveReject
      )
      .end(file.buffer);
  });

export const addUser = async (req: any, res: Response) => {
  try {
    const { name, email, age } = req.body;
    let profilePicture = req.files[0];
    let newUser;
    throwForNoExistence(
      res,
      !(!name || !email || !age || age <= 0 || !profilePicture),
      "Invalid Data",
      400
    );

    // if (!name || !email || !age || age <= 0 || !profilePicture)
    //   throw new Error("Invalid Data");

    const secureUrl = await uploadFileToCloudinary(profilePicture);
    newUser = new User({ name, email, age, dp: secureUrl });
    await newUser.save();
    res.send(newUser);
    console.log(`A new user added with ${email}`);

    // uploadFileToCloudinary(profilePicture)
    //   .then(async (secureUrl: any) => {
    //     newUser = new User({ name, email, age, dp: secureUrl });
    //     await newUser.save();
    //     res.send(newUser);
    //     console.log(`A new user added with ${email}`);
    //   })
    //   .catch((e: any) => {
    //     throwException(res, e.message, 400);
    //     // console.error("Error uploading file to Cloudinary:", e);
    //     // res.status(400).send(e.message.toString());
    //   });
  } catch (e: any) {
    // res.status(400).send(e.message.toString());
    throwException(res, e.message.toString(), 400);
  }
};
