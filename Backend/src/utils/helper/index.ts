import { v2 as cloudinary } from "cloudinary";
import { Response } from "express";
import { SERVER } from "utils/middleware/config/data";

export const checkExistence = (element: any[] | any) =>
  Array.isArray(element) ? element.length > 0 : !!element;

export const throwException = (
  res: Response,
  message?: string,
  code?: number
) => {
  res.status(code || SERVER.ERROR_CODE);
  throw new Error(message || SERVER.ERROR_MESSAGE);
};
export const throwForNoExistence = (
  res: Response,
  data: any,
  message?: string,
  code?: number
) => {
  if (!checkExistence(data))
    throwException(
      res,
      message || SERVER.ERROR_MESSAGE,
      code || SERVER.ERROR_CODE
    );
  return;
};
