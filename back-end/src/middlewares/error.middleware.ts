import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let status = "error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    status = err.status;
  } else if (err instanceof Error) {
    message = process.env.NODE_ENV === "development" ? err.message : "Something went wrong on our end";
  }
  if ((err as any).code === 11000) {
    statusCode = 400;
    const field = Object.keys((err as any).keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    status = "fail";
  }
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
    status = "fail";
  }
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${(err as any).path}: ${(err as any).value}`;
    status = "fail";
  }
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again";
    status = "fail";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired. Please log in again";
    status = "fail";
  }

  console.error(`[Error] ${req.method} ${req.url} - ${message}`);

  res.status(statusCode).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};