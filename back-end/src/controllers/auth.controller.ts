import {Request,Response} from "express"
import jwt from "jsonwebtoken"
import{User} from "../models/user.model"
import { AppError } from "../../utils/appError"
import {asyncHandler} from "../../utils/asyncHandler"

const signToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  return jwt.sign({ id: userId }, secret, {
    expiresIn: '7d', 
  });
};

export const register = asyncHandler(async(req:Request, res:Response)=>{
  const {username,email,password} = req.body
  const existingUser = await User.findOne({email})
  if(existingUser){
    throw new AppError("Email already exists",400)
  }
  const newUser = await User.create({username,email,password})

  const token = signToken(newUser._id.toString())

  res.status(201).json({
    success:true,
    message:"User registered successfully",
    token,
    data:{
      id:newUser._id,
      username:newUser.username,
      email:newUser.email,
      role:newUser.role,
    }
  })
})

export const login = asyncHandler(async(req:Request,res:Response)=>{
  const {email,password}=req.body
  if(!email || !password){
    throw new AppError("Please provide email and password",400)
  }
  const user = await User.findOne({email}).select("+password")
  if(!user || (await user.comparePassword(password))) {
    throw new AppError("Incorrect email or password",401)
  }

  const token = signToken(user._id.toString())
  res.status(200).json({
    success:true,
    message:"Login successful",
    token,
    data:{
      id:user._id,
      username:user.username,
      email:user.email,
      role:user.role
    }
  })
})