import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { pool } from "./database/connection.js";
import { userRouter } from "./routes/user.router.js";
import "./services/tmdb.service.js";
import { movieRouter } from "./routes/movie.router.js";

const app = express();
const PORT = 3000;
const HOST: string = "localhost";

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "PATCH", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  }),
);

app.use("/user", userRouter);
app.use("/movie", movieRouter);

const server = app
  .listen(PORT, HOST, () => {
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
