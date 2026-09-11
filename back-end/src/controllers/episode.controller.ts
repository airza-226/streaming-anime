import { Request, Response } from "express";
import { Episode } from "../models/episode.model";
import { Anime } from "../models/anime.model";
import { AppError } from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";
import { videoQueue } from "../queues/video.queue";

export const createEpisode = asyncHandler(
  async (req: Request, res: Response) => {
    const { animeId, episodeNumber, title, videoUrl, duration } = req.body;

    if (!animeId || !episodeNumber || !title) {
      throw new AppError("Anime ID, episode number, and title are required", 400);
    }

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

export const getEpisodesByAnime = asyncHandler(
  async (req: Request, res: Response) => {
    const { animeId } = req.params;

    const episodes = await Episode.find({ animeId }).sort({ episodeNumber: 1 });
    if(!episodes) {
      throw new AppError('Cannot find episode',404)
    }
    res.status(200).json({
      success: true,
      results: episodes.length,
      data: episodes,
    });
  }
);

export const uploadEpisode = asyncHandler(
  async (req: Request, res: Response) => {
    const { animeId, title, episodeNumber } = req.body;
    const file = req.file;

    if (!animeId || !title || !episodeNumber) {
      throw new AppError("Anime ID, title, and episode number are required", 400);
    }

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