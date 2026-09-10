import { Request, Response } from 'express';
import { Episode } from '../models/episode.model';
import { Anime } from '../models/anime.model';
import { AppError } from '../utils/appError';
import { asyncHandler } from '../utils/asyncHandler';

export const createEpisode = asyncHandler(async (req: Request, res: Response) => {
  const { animeId, episodeNumber, title, videoUrl, duration } = req.body;
  const animeExists = await Anime.findById(animeId);
  if (!animeExists) {
    throw new AppError('Anime not found with that ID', 404);
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
    data: episode,
  });
});
export const getEpisodesByAnime = asyncHandler(async (req: Request, res: Response) => {
  const { animeId } = req.params;
  const episodes = await Episode.find({ animeId }).sort({ episodeNumber: 1 });
  res.status(200).json({
    success: true,
    results: episodes.length,
    data: episodes,
  });
});