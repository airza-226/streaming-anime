import { Router } from "express";
import {
  createEpisode,
  uploadEpisode,
  getEpisodesByAnime,
  getEpisodeDetail,
  updateEpisode,
  deleteEpisode,
} from "../controllers/episode.controller";
import { protect, restrictTo } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { cacheMiddleware } from "../middlewares/cache.middleware";
import { uploadVideo } from "../middlewares/upload.middleware"; 
import {
  createEpisodeSchema,
  uploadEpisodeSchema,
  getEpisodeSchema,
  updateEpisodeSchema,
} from "../schemas/episode.schema";

const router = Router();

router.get(
  "/anime/:animeId",
  validate(getEpisodeSchema),
  cacheMiddleware(600),
  getEpisodesByAnime
);
router.get("/:id", getEpisodeDetail);
router.post(
  "/",
  protect,
  restrictTo("admin"),
  validate(createEpisodeSchema),
  createEpisode
);
router.post(
  "/upload",
  protect,
  restrictTo("admin"),
  uploadVideo.single("video"),    
  validate(uploadEpisodeSchema),  
  uploadEpisode
);
router
  .route("/:id")
  .patch(
    protect,
    restrictTo("admin"),
    validate(updateEpisodeSchema),
    updateEpisode
  )
  .delete(protect, restrictTo("admin"), deleteEpisode);

export default router;