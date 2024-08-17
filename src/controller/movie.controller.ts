import { NextFunction, Request, Response } from "express";
import { UpdateMovie as MovieInput } from "../types/movieTypes.js";
import { MovieModel } from "../models/movieModel.js";

export const updateMovieController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const args: MovieInput = req.body;
    const response = await MovieModel.updateMovie(args);
    res
      .status(201)
      .json({ message: "Movie updated successfully", data: response });
  } catch (err) {
    console.error("Error updating movie, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};

export const getMovieByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid movie id" });
      return;
    }
    const response = await MovieModel.getMovieById(id);
    res.status(200).json({ message: "Movie fetched", data: response });
    if (!response) {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    console.error("Error fetching movie, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};

export const getAllMoviesController = async (_: Request, res: Response) => {
  try {
    const response = await MovieModel.getAllMovies();
    res.status(200).json({ message: "Movies fetched", data: response });
  } catch (err) {
    console.error("Error fetching movies, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};

export const deleteMovieController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid movie id" });
      return;
    }
    const response = await MovieModel.deleteMovie(id);
    res.status(200).json({ message: "Movie deleted", data: response });
    if (!response) {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    console.error("Error deleting movie, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};
