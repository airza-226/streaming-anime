import { Schema, model } from "mongoose";
import { IEpisode } from "../types/anime.types";

const episodeSchema = new Schema<IEpisode>(
  {
    animeId: {
      type: Schema.Types.ObjectId,
      ref: "Anime",
      required: [true, "Episode must belong to an anime"],
    },
    episodeNumber: {
      type: Number,
      required: [true, "Episode number is required"],
    },
    title: {
      type: String,
      required: [true, "Episode title is required"],
    },
    videoUrl: {
      type: String,
    },
    duration: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "ready", "failed"],
      default: "ready",
    },
  },
  {
    timestamps: true,
  }
);

episodeSchema.index({ animeId: 1, episodeNumber: 1 }, { unique: true });

export const Episode = model<IEpisode>("Episode", episodeSchema);