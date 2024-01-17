import User from "models/user";

export const saveUser = async (newUser: any) => newUser.save();
