import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getUserByIdQuery = `-- name: GetUserById :one
SELECT userid, username, name, email, role, phone, password, created_at, updated_at FROM users WHERE userid = $1`;

export interface GetUserByIdArgs {
    userid: string;
}

export interface GetUserByIdRow {
    userid: string;
    username: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function getUserById(client: Client, args: GetUserByIdArgs): Promise<GetUserByIdRow | null> {
    const result = await client.query({
        text: getUserByIdQuery,
        values: [args.userid],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        userid: row[0],
        username: row[1],
        name: row[2],
        email: row[3],
        role: row[4],
        phone: row[5],
        password: row[6],
        createdAt: row[7],
        updatedAt: row[8]
    };
}

export const createUserQuery = `-- name: CreateUser :one
INSERT INTO users (userid, username, name, email, role, phone, password)
VALUES ($1, $2, $3, $4, $5, $6, $7)
returning userid, username, name, email, role, phone, password, created_at, updated_at`;

export interface CreateUserArgs {
    userid: string;
    username: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    password: string;
}

export interface CreateUserRow {
    userid: string;
    username: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function createUser(client: Client, args: CreateUserArgs): Promise<CreateUserRow | null> {
    const result = await client.query({
        text: createUserQuery,
        values: [args.userid, args.username, args.name, args.email, args.role, args.phone, args.password],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        userid: row[0],
        username: row[1],
        name: row[2],
        email: row[3],
        role: row[4],
        phone: row[5],
        password: row[6],
        createdAt: row[7],
        updatedAt: row[8]
    };
}

