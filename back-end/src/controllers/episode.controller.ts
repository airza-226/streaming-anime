import { Request, Response } from "express";
import { Episode } from "../models/episode.model";
import { Anime } from "../models/anime.model";
import { AppError } from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";
import { videoQueue } from "../queues/video.queue";

export const createEpisode = asyncHandler(
  async (req: Request, res: Response) => {
    const { animeId, episodeNumber, title, videoUrl, duration } = req.body;

    const animeExists = await Anime.findById(animeId);
    if (!animeExists) {
      throw new AppError("Anime not found with that ID", 404);
    }

    const existingEpisode = await Episode.findOne({ animeId, episodeNumber });
    if (existingEpisode) {
      throw new AppError(`Episode ${episodeNumber} already exists for this anime`, 400);
    }

    const episode = await Episode.create({
      animeId,
      episodeNumber,
      title,
      videoUrl,
      duration,
    });

    res.status(201).json({
      success: true,
      message: "Episode created successfully",
      data: episode,
    });
  }
);

export const uploadEpisode = asyncHandler(
  async (req: Request, res: Response) => {
    const { animeId, title, episodeNumber } = req.body;
    const file = req.file;

    if (!file) {
      throw new AppError("Video file is required", 400);
    }

    const animeExists = await Anime.findById(animeId);
    if (!animeExists) {
      throw new AppError("Anime not found with that ID", 404);
    }

    const existingEpisode = await Episode.findOne({ animeId, episodeNumber });
    if (existingEpisode) {
      throw new AppError(`Episode ${episodeNumber} already exists for this anime`, 400);
    }

    const newEpisode = await Episode.create({
      animeId,
      title,
      episodeNumber,
      status: "pending",
    });

    await videoQueue.add("transcode", {
      episodeId: newEpisode._id,
      inputPath: file.path,
      filename: file.filename,
    });

    res.status(202).json({
      success: true,
      message: "Video uploaded successfully and added to transcoding queue",
      data: newEpisode,
    });
  }
);
export const getEpisodesByAnime = asyncHandler(
  async (req: Request, res: Response) => {
    const { animeId } = req.params;

    const episodes = await Episode.find({ animeId }).sort({ episodeNumber: 1 });

    res.status(200).json({
      success: true,
      results: episodes.length,
      data: episodes,
    });
  }
);
export const getEpisodeDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const episode = await Episode.findById(id).populate("animeId", "title slug coverImage");
    if (!episode) {
      throw new AppError("Episode not found", 404);
    }

    res.status(200).json({
      success: true,
      data: episode,
    });
  }
);

export const updateEpisode = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const episode = await Episode.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!episode) {
      throw new AppError("Episode not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Episode updated successfully",
      data: episode,
    });
  }
);

export const deleteEpisode = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const episode = await Episode.findByIdAndDelete(id);
    if (!episode) {
      throw new AppError("Episode not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Episode deleted successfully",
    });
  }
);