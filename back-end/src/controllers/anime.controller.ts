import { Request, Response } from 'express';
import slugify from 'slugify'
import mongoose from 'mongoose';
import { Anime } from '../models/anime.model';
import { Episode } from '../models/episode.model';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/appError';
import { APIFeatures } from '../utils/apiFeatures';
export const getAllAnime = asyncHandler(async (req: Request, res: Response) => {
  const features = new APIFeatures(Anime.find().select('-episodes'), req.query)
    .search()
    .filter()
    .sort()
    .paginate();
  const [animeResult, totalResult] = await Promise.allSettled([
    features.query,
    Anime.countDocuments(),
  ]);
  const animeList = animeResult.status === 'fulfilled' ? animeResult.value : [];
  const totalAnime = totalResult.status === 'fulfilled' ? totalResult.value : 0;
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 12, 1);
  res.status(200).json({
    success: true,
    results: animeList.length,
    pagination: {
      totalData: totalAnime,
      totalPages: Math.ceil(totalAnime / limit),
      currentPage: page,
      limit,
    },
    data: animeList,
  });
});
export const createAnime = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    throw new AppError('make sure include title', 400);
  }
  const slug = slugify(title, { lower: true, strict: true });
  const existingAnime = await Anime.findOne({ slug });
  if (existingAnime) {
    throw new AppError('Anime with this title has already added', 400);
  }

  const newAnime = await Anime.create({
    ...req.body,
    slug,
  });

  res.status(201).json({
    success: true,
    data: newAnime,
  });
});
export const updateAnime = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  }
  const updatedAnime = await Anime.findByIdAndUpdate(id, req.body, {
    new: true, 
    runValidators: true, 
  });
  if (!updatedAnime) {
    throw new AppError('Anime not found', 404);
  }
  res.status(200).json({
    success: true,
    data: updatedAnime,
  });
});
export const deleteAnime = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const anime = await Anime.findById(id).session(session);
    if (!anime) {
      throw new AppError('Anime not found', 404);
    }
    await Episode.deleteMany({ anime: id }).session(session);
    await Anime.findByIdAndDelete(id).session(session);
    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: 'Deleted successfully',
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});