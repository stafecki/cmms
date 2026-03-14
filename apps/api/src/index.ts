import app from "./app.js";
import {serve} from "@hono/node-server";

const PORT = Number(process.env.PORT) || 3000;

serve({
    fetch: app.fetch,
    port: PORT,
}, (info) => {
    console.log(`Server running at http://localhost:${info.port}`);
})

