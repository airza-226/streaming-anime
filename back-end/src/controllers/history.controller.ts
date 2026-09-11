import { WatchHistory } from "../models/history.model";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
export const updateProgress = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const { animeId, episodeId, progress, duration } = req.body;
    const isCompleted = duration > 0 ? progress / duration >= 0.9 : false;

    const history = await WatchHistory.findOneAndUpdate(
      {
        user: userId,
        episode: episodeId,
      },
      {
        user: userId,
        anime: animeId,
        episode: episodeId,
        progress,
        duration,
        isCompleted,
        lastWatchedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      success: true,
      data: history,
    });
  },
);

export const getWatchHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user_id;
    const history = await WatchHistory.find({ user: userId })
      .sort({ lastWatchedAt: -1 })
      .populate({
        path: "anime",
        select: "title slug coverImage",
      })
      .populate({
        path: "episode",
        select: "episodeNumber title duration",
      })
      .limit(20);
    res.status(200).json({
      success: true,
      result: history.length,
      data: history,
    });
  },
);
