import express from "express";
import {
  addTheaterController,
  getTheaterByIdController,
  getTheaterByMovieAndLocationController,
} from "../controller/theater.controller.js";

const theaterRouter = express.Router();

theaterRouter.post("/", addTheaterController);
theaterRouter.get("/", getTheaterByMovieAndLocationController);
theaterRouter.get("/:id", getTheaterByIdController);

export { theaterRouter };
