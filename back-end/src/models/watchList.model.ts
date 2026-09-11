import { Schema, model } from "mongoose";
import { IWatchList } from "../types/anime.types";

const watchListSchema = new Schema<IWatchList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    anime: { types: Schema.Types.ObjectId, ref: "Anime", required: true },
    status: {
      type: String,
      enum: ["watching", "plan_to_watch", "completed", "on_hold", "dropped"],
      default: "plan_to_watch",
    },
  },
  {
    timestamps: true,
  },
);

watchListSchema.index({ user: 1, anime: 1 }, { unique: true });
export const WatchList = model<IWatchList>("WatchList", watchListSchema);
