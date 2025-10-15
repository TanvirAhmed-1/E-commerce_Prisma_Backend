import express from "express";
import cors from "cors";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { BaseRouter } from "./app/routes";
import cookieParser from "cookie-parser";

const app = express();

// ✅ Correct CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"], // তোমার React frontend এর URL
    credentials: true, // cookie পাঠানোর অনুমতি দেয়
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api", BaseRouter);

app.get("/", (req, res) => {
  res.send("Server running successfully!");
});

// ✅ Global error handler
app.use(globalErrorHandler);

// ✅ 404 Not Found handler
app.use(notFoundHandler);

export default app;
