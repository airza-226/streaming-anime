import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import { connectDB } from "./config/db";
import { AppError } from "./utils/appError";
import { errorHandler } from "./middlewares/error.middleware";
import { globalLimiter, authLimiter } from "./middlewares/rateLimit.middleware";
import { initVideoWorker } from "./workers/video.worker";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import animeRoutes from "./routes/anime.routes";
import episodeRoutes from "./routes/episode.routes";
import watchListRouter from "./routes/watchListRouter"
dotenv.config();
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...", err);
  process.exit(1);
});

const app: Application = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(morgan("dev"));
app.use("/api", globalLimiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/v1/auth", authLimiter, authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/anime", animeRoutes);
app.use("/api/v1/episodes", episodeRoutes);
app.use("/api/v1/watch-list", watchListRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = connectDB().then(() => {
  initVideoWorker();
  return app.listen(PORT, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
    );
  });
});

process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION! Shutting down...", err);
  server.then((s) => {
    s.close(() => {
      process.exit(1);
    });
  });
});