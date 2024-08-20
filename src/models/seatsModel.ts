import { pool } from "../database/connection.js";
import { insertSeats } from "../generated/seats_sql.js";
import { InsertSeatsArgs } from "../types/seatsTypes.js";

export class SeatModel {
  static async insertSeats(seats: string): Promise<void> {
    const args: InsertSeatsArgs = { parseJson: seats };
    const result = await insertSeats(pool, args);
    return result;
  }
}
