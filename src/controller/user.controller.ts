import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModel.js";
import { User } from "../types/userTypes.js";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user: User = req.body;
    const response = await UserModel.createUser(user);
    res
      .status(201)
      .json({ message: "User created successfully", data: response });
  } catch (err) {
    console.error("Error creating user, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};
