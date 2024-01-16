import { v2 as cloudinary } from "cloudinary";
import { Response } from "express";
import { SERVER } from "utils/middleware/config/data";

export const configureCloudinary = () => {
  cloudinary.config({
    secure: true,
    cloud_name: "duezpwbn1",
    api_key: "969571113531676",
    api_secret: "tPmBm8R34bNmFK7ZH8aZ5VUBqP8",
    signature_algorithm: "sha256",
  });
};

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

// export const throwOnlyError = (element: any, message?: string) => {
//   if (!checkExistence(element))
//     throw new Error(message || SERVER.ERROR_MESSAGE);
// };
