import { pool } from "../database/connection.js";
import {
  deleteAllSeatsByScreenID,
  getSeatsByScreenID,
  insertSeats,
} from "../generated/seats_sql.js";
import { InsertSeatsArgs, SeatResult } from "../types/seatsTypes.js";

export class SeatModel {
  static async insertSeats(seats: string): Promise<void> {
    const args: InsertSeatsArgs = { parseJson: seats };
    const result = await insertSeats(pool, args);
    return result;
  }
  static async getSeatsByScreenID(screenId: string): Promise<SeatResult[]> {
    const result = await getSeatsByScreenID(pool, { screenId });
    return result;
  }
  static async deleteAllSeats(screenId: string): Promise<void> {
    const result = await deleteAllSeatsByScreenID(pool, { screenId });
    return result;
  }
}
