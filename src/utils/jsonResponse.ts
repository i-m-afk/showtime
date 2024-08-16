import { Response } from "express";
export class responseHandler {
  static successResponse(
    res: Response,
    statusCode: number,
    message: string,
    data: JSON,
  ) {
    res.status(statusCode).json({
      message,
      data,
    });
  }
  static errorResponse(res: Response, statusCode: number, message: string) {
    res.status(statusCode).json({
      message,
    });
  }
}
