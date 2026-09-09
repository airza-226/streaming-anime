import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError';
import { asyncHandler } from '../utils/asyncHandler';
import { User } from '../models/user.model';


interface JwtPayload {
  id: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
         req.user = await User.findById(decoded.id).select('-password');
        return next(); 
      } catch (error) {
        return next(new AppError('Not authorized, token failed', 401));
      }
    }
    if (!token) {
      return next(new AppError('Not authorized, no token provided', 401));
    }
  }
);