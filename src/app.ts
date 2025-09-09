import "dotenv/config";
import express from "express";
import router from "./routes/index";

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api", router);

export default app;
