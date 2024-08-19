import { pool } from "../database/connection.js";
import { getShowsByTheater } from "../generated/showtimes_sql.js";
import { GetShowsByTheater } from "../types/showtimeTypes.js";

export class ShowtimeModel {
  static async getShowsByTheater(
    theaterid: string,
  ): Promise<GetShowsByTheater[] | null> {
    const theater = await getShowsByTheater(pool, { theaterid });
    return theater ? theater : null;
  }
}
