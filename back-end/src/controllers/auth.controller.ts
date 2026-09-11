import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { AppError } from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";
import { sendRefreshTokenCookie,signAccessToken,signRefreshToken } from "../helper/jwt.helper";


export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email is already registered, please use another email", 400);
  }
  const newUser = await User.create({ username, email, password });
  const accessToken = signAccessToken(newUser._id.toString());
  const refreshToken = signRefreshToken(newUser._id.toString());
  sendRefreshTokenCookie(res, refreshToken);
  res.status(201).json({
    success: true,
    message: "Registration successful",
    accessToken,
    data: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = signAccessToken(user._id.toString());
  const refreshToken = signRefreshToken(user._id.toString());

  sendRefreshTokenCookie(res, refreshToken);

  res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.jwt;

  if (!token) {
    throw new AppError("Your session has expired, please log in again", 401);
  }

  let decoded: { id: string };
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as { id: string };
  } catch (err) {
    throw new AppError("Invalid or expired token", 401);
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new AppError("The user belonging to this token no longer exists", 401);
  }

  const newAccessToken = signAccessToken(currentUser._id.toString());

  res.status(200).json({
    success: true,
    accessToken: newAccessToken,
  });
});

export const logout = asyncHandler(async(req:Request,res:Response) =>{
  res.cookie("jwt","",{
    httpOnly:true,
    expires:new Date(0)
  })
  res.status(200).json({
    success:true,
    message:"Logged Out successfully"
  })
})