import express from "express";
import {
  deleteMovieController,
  getAllMoviesController,
  getMovieByIdController,
  updateMovieController,
} from "../controller/movie.controller.js";

const movieRouter = express.Router();

movieRouter.put("/", updateMovieController);
movieRouter.get("/:id", getMovieByIdController);
movieRouter.get("/", getAllMoviesController);
movieRouter.delete("/:id", deleteMovieController);

export { movieRouter };
