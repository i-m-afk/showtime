import { pool } from "../database/connection.js";
import { createUser } from "../generated/users_sql.js";
import { User } from "../types/userTypes.js";

export class UserModel {
  static async createUser(user: User): Promise<User | null> {
    return await createUser(pool, user);
  }
}
