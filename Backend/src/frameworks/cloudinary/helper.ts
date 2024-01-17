import { v2 as cloudinary } from "cloudinary";
import Joi from "joi";

export const uploadFileToCloudinary = async (file: any) =>
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

export const configureCloudinary = () => {
  cloudinary.config({
    secure: true,
    cloud_name: "duezpwbn1",
    api_key: "969571113531676",
    api_secret: "tPmBm8R34bNmFK7ZH8aZ5VUBqP8",
    signature_algorithm: "sha256",
  });
};

export const validateUserInfo = (user: any) => {
  const userSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email(),
    age: Joi.number().min(1),
    profilePicture: Joi.required(),
  });
  userSchema.validate(user);
};
