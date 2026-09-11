import rateLimit from "express-rate-limit"
import { AppError } from "../utils/appError"

export const globalLimiter = rateLimit({
  windowMs:15 * 60 * 1000,
  max:100,
  standardHeaders:true,
  legacyHeaders:false,
  handler:(req,res,next) =>{
    next(new AppError('Too much request,please try again',429))
  }  
})

export const authLimiter = rateLimit({
    windowMs:15 * 60 * 1000,
    max:10,
    standardHeaders:true,
    legacyHeaders:false,
    handler:(req,res,next)=>{
        next(new AppError('too much authentication.account disabled',429))
    }
})