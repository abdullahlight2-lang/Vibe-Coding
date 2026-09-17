import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connection = mysql.createPool(
  process.env.DATABASE_URL || "mysql://root:password@localhost:3306/vibe_db"
);

export const db = drizzle(connection, { schema, mode: "default" });
