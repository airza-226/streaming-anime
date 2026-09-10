import { Router } from "express";
import {
  createEpisode,
  getEpisodesByAnime,
} from "../controllers/episode.controller";
import { protect, restrictTo } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createEpisodeSchema } from "../schemas/episode.schema";

const router = Router();
router.get("/anime/:animeId", getEpisodesByAnime);
router.post(
  "/",
  protect,
  restrictTo("admin"),
  validate(createEpisodeSchema),
  createEpisode,
);

export default router 