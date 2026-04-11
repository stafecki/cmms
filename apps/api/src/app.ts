import { Hono } from "hono";
import dotenv from "dotenv";

dotenv.config();
const app = new Hono();
app.get("/", async (c) => {
  return c.body("Hello World !");
});

export default app;
