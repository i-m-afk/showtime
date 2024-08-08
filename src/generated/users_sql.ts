import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getAllUsersQuery = `-- name: GetAllUsers :many
SELECT id, username, name, email, role, phone, order_id, password, created_at, updated_at FROM users`;

export interface GetAllUsersRow {
    id: string;
    username: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    orderId: number;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function getAllUsers(client: Client): Promise<GetAllUsersRow[]> {
    const result = await client.query({
        text: getAllUsersQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            username: row[1],
            name: row[2],
            email: row[3],
            role: row[4],
            phone: row[5],
            orderId: row[6],
            password: row[7],
            createdAt: row[8],
            updatedAt: row[9]
        };
    });
}

export const createUserQuery = `-- name: CreateUser :one
INSERT INTO users (id, username, name, email, role, phone, order_id, password)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
returning id, username, name, email, role, phone, order_id, password, created_at, updated_at`;

export interface CreateUserArgs {
    id: string;
    username: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    orderId: number;
    password: string;
}

export interface CreateUserRow {
    id: string;
    username: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    orderId: number;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function createUser(client: Client, args: CreateUserArgs): Promise<CreateUserRow | null> {
    const result = await client.query({
        text: createUserQuery,
        values: [args.id, args.username, args.name, args.email, args.role, args.phone, args.orderId, args.password],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        username: row[1],
        name: row[2],
        email: row[3],
        role: row[4],
        phone: row[5],
        orderId: row[6],
        password: row[7],
        createdAt: row[8],
        updatedAt: row[9]
    };
}

