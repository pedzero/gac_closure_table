import "dotenv/config";
import express from "express";
import router from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api", router);

// error handler
app.use(errorHandler);

export default app;
