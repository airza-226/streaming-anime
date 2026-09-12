import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
export const createEpisodeSchema = z.object({
  body: z.object({
    animeId: z.string().regex(objectIdRegex, "Invalid Anime ID format"),
    episodeNumber: z.number().positive("Episode number must be greater than 0"),
    title: z.string().min(1, "Title is required"),
    videoUrl: z.string().url("Invalid video URL format"),
    duration: z.number().positive().optional(),
  }),
});

export const uploadEpisodeSchema = z.object({
  body: z.object({
    animeId: z.string().regex(objectIdRegex, "Invalid Anime ID format"),
    episodeNumber: z.coerce.number().positive("Episode number must be positive"),
    title: z.string().min(1, "Title is required"),
  }),
});

export const getEpisodeSchema = z.object({
  params: z.object({
    animeId: z.string().regex(objectIdRegex, "Invalid Anime ID format"),
  }),
});
export const updateEpisodeSchema = z.object({
  params: z.object({
    id: z.string().regex(objectIdRegex, "Invalid Episode ID format"),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    episodeNumber: z.number().positive().optional(),
    videoUrl: z.string().url().optional(),
    duration: z.number().positive().optional(),
  }),
});