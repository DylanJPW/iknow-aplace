import "dotenv/config";
import express from "express";
import cors from "cors";
import {usersRouter} from "./users/api.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/users", usersRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
