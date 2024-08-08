import express, { Request, Response } from "express";
import { User } from "./types/userTypes";
import { UserModel } from "./models/userModel.js";
import { pool } from "./database/connection.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("hello");
});

app.post("/user", async (request: Request, response: Response) => {
  try {
    const user: User = request.body;
    const res = await UserModel.createUser(user);
    response
      .status(201)
      .json({ message: "User created successfully", data: res });
  } catch (err) {
    console.error("Error creating user, ", err);
    response.status(501).json({ message: "Internal Server Error" });
  }
});

const server = app
  .listen(PORT, "127.0.0.1", () => {
    console.log("server is running on localhost: ", PORT);
  })
  .on("error", (err) => {
    throw new Error(err.message);
  });

// graceful shutdown
const gracefulShutdown = () => {
  console.log("Received shutdown signal, closing HTTP server.");
  server.close(async (err) => {
    if (err) {
      console.error("Error closing server:", err);
      process.exit(1);
    }
    console.log("HTTP server closed.");
    try {
      await pool.end();
      console.log("Database pool closed.");
      process.exit(0);
    } catch (err) {
      console.error("Error closing database pool:", err);
      process.exit(1);
    }
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
