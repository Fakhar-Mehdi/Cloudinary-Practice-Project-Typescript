import Joi from "joi";

export const validateUserInfo = (user: any) => {
  const userSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email(),
    age: Joi.number().min(1),
    profilePicture: Joi.required(),
  });
  userSchema.validate(user);
};
