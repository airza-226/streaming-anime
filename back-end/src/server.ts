import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { AppError } from "./utils/appError"; 
import authRoutes from './routes/auth.routes';
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./routes/user.routes";
dotenv.config();
import animeRoutes from "./routes/anime.routes"

const app: Application = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/anime',animeRoutes)
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
});