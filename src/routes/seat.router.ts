import express from "express";
import { insertSeatsController } from "../controller/seats.controller.js";

const seatRouter = express.Router();
seatRouter.post("/", insertSeatsController);

export { seatRouter };
