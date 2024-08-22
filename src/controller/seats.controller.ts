import { NextFunction, Request, Response } from "express";
import { SeatModel } from "../models/seatsModel.js";
export const insertSeatsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const seats = JSON.stringify(req.body);
    await SeatModel.insertSeats(seats);
    res.status(201).json({ message: "Seats inserted successfully" });
  } catch (err: any) {
    console.error("Error inserting seats, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};

export const getSeatsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const screenId = req.params.screenid;
    const data = await SeatModel.getSeatsByScreenID(screenId);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error inserting seats, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};

export const deleteAllSeatsByScreenIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const screenId = req.params.screenid;
    await SeatModel.deleteAllSeats(screenId);
    res.status(200).json({ message: "Seats deleted successfully" });
  } catch (err) {
    console.error("Error deleting seats, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};
