import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { AppError } from '../../utils/appError';
import { asyncHandler } from '../../utils/asyncHandler';

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});