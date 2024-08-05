import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
  query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getAllUsersQuery = `-- name: GetAllUsers :many
SELECT id, username, password, created_at FROM users`;

export interface GetAllUsersRow {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
}

export async function getAllUsers(client: Client): Promise<GetAllUsersRow[]> {
  const result = await client.query({
    text: getAllUsersQuery,
    values: [],
    rowMode: "array",
  });
  return result.rows.map((row) => {
    return {
      id: row[0],
      username: row[1],
      password: row[2],
      createdAt: row[3],
    };
  });
}
