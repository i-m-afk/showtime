import express from "express";
import { getShowsByTheaterController } from "../controller/showtime.controller.js";
const showtimeRouter = express.Router();

// get all the showtimes by theater
showtimeRouter.get("/theater/:id", getShowsByTheaterController);

export { showtimeRouter };
