import { Hono } from "hono";
import dotenv from "dotenv";
import {prisma} from "./lib/prisma.js";

dotenv.config();
const app = new Hono();
app.get("/", async (c) => {
  return c.body("Hello World !");
});

export default app;
