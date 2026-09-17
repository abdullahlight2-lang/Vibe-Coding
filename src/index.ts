import { Elysia, t } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Elysia()
  // Healthcheck endpoint
  .get("/", () => ({
    status: "ok",
    message: "Server ElysiaJS + Drizzle + MySQL berjalan!",
  }))
  // Get all users
  .get("/users", async () => {
    try {
      const allUsers = await db.select().from(users);
      return { success: true, data: allUsers };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  })
  // Create user
  .post(
    "/users",
    async ({ body }) => {
      try {
        const result = await db.insert(users).values(body);
        return { success: true, message: "User berhasil dibuat", result };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String({ format: "email" }),
      }),
    }
  )
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia server running at ${app.server?.hostname}:${app.server?.port}`
);
