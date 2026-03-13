import app from "./app.js";

const PORT = process.env.PORT || 3000;

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    }).on("error", (err) => {
        console.error("Błąd serwera:", err.message);
    });
}

startServer()
