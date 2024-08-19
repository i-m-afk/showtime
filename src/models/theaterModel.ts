import { pool } from "../database/connection.js";
import {
  addTheater,
  getTheaterByID,
  getTheatersByMovieAndLocation,
} from "../generated/theaters_sql.js";
import { Theater, TheaterWithMovieCity } from "../types/theaterTypes.js";

export class TheaterModel {
  static async addTheater(theater: Theater): Promise<Theater | null> {
    const result = await addTheater(pool, theater);
    return result ? result : null;
  }
  static async getTheatersByMovieAndLocation(
    movieid: number,
    city: string,
  ): Promise<TheaterWithMovieCity[]> {
    const result = await getTheatersByMovieAndLocation(pool, {
      movieid,
      lower: city,
    });
    return result;
  }
  static async getTheaterById(theaterid: string): Promise<Theater | null> {
    const theater = await getTheaterByID(pool, { theaterid });
    return theater ? theater : null;
  }
}
