import express from "express";
import {
  deleteAllSeatsByScreenIdController,
  getSeatsController,
  insertSeatsController,
} from "../controller/seats.controller.js";

const seatRouter = express.Router();
seatRouter.post("/", insertSeatsController);
seatRouter.get("/:screenid", getSeatsController);
seatRouter.delete("/:screenid", deleteAllSeatsByScreenIdController);

export { seatRouter };
