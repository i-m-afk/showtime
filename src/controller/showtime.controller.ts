import { NextFunction, Response, Request } from "express";
import { ShowtimeModel } from "../models/showModel.js";

export const getShowsByTheaterController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const theaterid = req.params.id;
    const response = await ShowtimeModel.getShowsByTheater(theaterid);
    res.status(201).json({ message: "Data fetched", data: response });
  } catch (err) {
    console.error("Error fetching theater, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};
