import { Request, Response } from "express";
import { WatchList } from "../models/watchList.model";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/appError";

export const upsertWatchList = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const { animeId, status } = req.body;

    if (!animeId) {
      throw new AppError("Anime ID is required", 400);
    }
    const item = await WatchList.findOneAndUpdate(
      {
        user: userId,
        anime: animeId,
      },
      {
        status,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Watchlist updated successfully",
      data: item,
    });
  }
);

export const getUserWatchList = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const { status } = req.query;

    const filter: any = { user: userId };
    if (status) filter.status = status;

    const watchList = await WatchList.find(filter)
      .populate("anime", "title slug coverImage rating status")
      .sort("-updatedAt");

    res.status(200).json({
      success: true,
      results: watchList.length,
      data: watchList,
    });
  }
);

export const removeFromWatchList = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const { animeId } = req.params;

    const item = await WatchList.findOneAndDelete({
      user: userId,
      anime: animeId,
    });

    if (!item) {
      throw new AppError("Item not found in your watchList", 404);
    }

    res.status(200).json({
      success: true,
      message: "Anime removed from watchList",
    });
  }
);