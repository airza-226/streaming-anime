import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path"; 
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { connectDB } from "./config/db";
import { AppError } from "./utils/appError"; 
import { errorHandler } from "./middlewares/error.middleware";
import { globalLimiter, authLimiter } from "./middlewares/rateLimit.middleware";

import authRoutes from './routes/auth.routes';
import userRoutes from "./routes/user.routes";
import animeRoutes from "./routes/anime.routes";
import episodeRoutes from "./routes/episode.routes";

dotenv.config();
const app: Application = express();
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use("/api", globalLimiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }))
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});
app.use('/api/v1/auth', authLimiter, authRoutes); 
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/anime', animeRoutes);
app.use('/api/v1/episodes', episodeRoutes); 
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
});