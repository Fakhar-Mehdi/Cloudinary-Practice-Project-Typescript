import { Response } from "express";
import { SERVER_ERROR } from "utils/constants/errors";

export const checkExistence = (element: any[] | any) =>
  Array.isArray(element) ? element.length > 0 : !!element;

const generateErrorResponse = (statusCode: number, message: string) => ({
  statusCode,
  message,
});

const throwException = (res: Response, message?: string, code?: number) => {
  throw generateErrorResponse(
    code || SERVER_ERROR.code,
    message || SERVER_ERROR.message
  );
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
      message || SERVER_ERROR.message,
      code || SERVER_ERROR.code
    );
  return;
};
