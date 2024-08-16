import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModel.js";
import { User } from "../types/userTypes";
import { responseHandler } from "../utils/jsonResponse.js";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user: User = req.body;
    const response = await UserModel.createUser(user);
    if (response === null) {
      throw new Error("error creating user");
    }
    responseHandler.successResponse(
      res,
      201,
      "user created successfully",
      response as unknown as JSON,
    );
  } catch (err) {
    console.error("error creating user, ", err);
    responseHandler.errorResponse(res, 501, "Internal Server Error");
  }
};
