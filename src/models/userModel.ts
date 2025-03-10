import { pool } from "../database/connection.js";
import { createUser, getUserById } from "../generated/users_sql.js";
import { User } from "../types/userTypes.js";

export class UserModel {
  static async createUser(user: User): Promise<User | null> {
    const result = await createUser(pool, user);
    return result ? result : null;
  }
  static async getUserById(userid: string): Promise<User | null> {
    const result = await getUserById(pool, { userid });
    return result ? result : null;
  }
}
