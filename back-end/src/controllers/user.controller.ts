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

export const toggleBookmark = asyncHandler(async(req:Request,res:Response) => {
    const {animeId} = req.params
    const userId = req.user?.id
    const user = await User.findById(userId)
    if(!user) throw new AppError('User not found',401)
   const isBookmarked = user.bookmarks.includes(animeId as any);
    if(isBookmarked) {
        user.bookmarks = user.bookmarks.filter((id)=> id.toString() !== animeId)
    } else {
        user.bookmarks.push(animeId as any)
    }
    await user.save()
    res.status(200).json({
        success:true,
        message:isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
        data:user.bookmarks,
    })
})

export const getMyBookmarks = asyncHandler(async(req:Request, res:Response) => {
    const user = await User.findById(req.user.id).populate('bookmarks')
    res.status(200).json({
        success:true,
        data:user?.bookmarks || []
    })
})