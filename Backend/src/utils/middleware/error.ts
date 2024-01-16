import { NextFunction, Request, Response } from "express";
import { SERVER } from "utils/middleware/config/data/index";

const error = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.statusCode === 200) res.status(500);
  res.send(`ERROR:\n${err.message || SERVER.ERROR_MESSAGE}`);
  console.log(`ERROR:\n${err.message || SERVER.ERROR_MESSAGE}`);
  next();
};

export default error;
