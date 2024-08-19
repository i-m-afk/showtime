import { NextFunction, Request, Response } from "express";
import { Theater } from "../types/theaterTypes.js";
import { TheaterModel } from "../models/theaterModel.js";

export const addTheaterController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const theater: Theater = req.body;
    const response = await TheaterModel.addTheater(theater);
    res
      .status(201)
      .json({ message: "Theater created successfully", data: response });
  } catch (err) {
    console.error("Error creating theater, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};

export const getTheaterByMovieAndLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movieid = parseInt(req.query.movieid as string);
    const city = req.query.city as string;
    console.log(movieid, city);
    const response = await TheaterModel.getTheatersByMovieAndLocation(
      movieid,
      city,
    );
    res.status(201).json({ message: "Data fetched", data: response });
  } catch (err) {
    console.error("Error fetching theater, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};

export const getTheaterByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const response = await TheaterModel.getTheaterById(id);
    res.status(201).json({ message: "Theater fetched", data: response });
  } catch (err) {
    console.error("error fetching theater", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};
