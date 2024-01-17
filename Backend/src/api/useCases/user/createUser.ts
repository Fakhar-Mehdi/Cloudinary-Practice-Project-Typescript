import { saveUser } from "database/UserRepo";
import User from "models/user";

export const createUser = async (user: any) => {
  const newUser = new User(user);
  const savedUser = await saveUser(newUser);
  return savedUser;
};
