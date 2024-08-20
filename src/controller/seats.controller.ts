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
  } catch (err) {
    console.error("Error inserting seats, ", err);
    res.status(501).json({ message: "Internal Server Error" });
  }
};
