import express from "express";
import { createUserController } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/", createUserController);

export { userRouter };
