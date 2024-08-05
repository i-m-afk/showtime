import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const { Pool } = pg;

// My hate for ESM and CJS is eternal
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("define DATABASE_URL in .env file");
  }
  const pool = new Pool({ connectionString: connectionString });

  try {
    // Get a new client from the pool
    const client = await pool.connect();
    console.log("Connected to the database");

    const res = await client.query("SELECT NOW()");
    console.log("Current time from the database:", res.rows[0]);

    // You are free my friend
    client.release();
  } catch (err) {
    console.error("Database connection error", err);
  } finally {
    // Just end it all
    await pool.end();
  }
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
