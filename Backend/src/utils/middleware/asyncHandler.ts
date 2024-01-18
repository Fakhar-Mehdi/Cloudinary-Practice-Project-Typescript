import { Request, Response, NextFunction } from "express";
import { SERVER_ERROR } from "utils/constants/errors";

const asyncHandler =
  (callback: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error: any) {
      console.log(error.message);
      res.status(error.statusCode || SERVER_ERROR.code).json({
        code: error.statusCode || SERVER_ERROR.code,
        message: error.message || SERVER_ERROR.message,
      });
    }
  };
export default asyncHandler;
