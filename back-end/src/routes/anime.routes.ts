import { Router } from "express";
import {
  createAnime,
  getAllAnime,
  getAnimeDetail,
  updateAnime,
  deleteAnime,
} from "../controllers/anime.controller";
import { protect, restrictTo } from "../middlewares/auth.middleware";
import { uploadThumbnail } from "../middlewares/upload.middleware";
import { cacheMiddleware } from "../middlewares/cache.middleware";

const router = Router();

router.get("/", cacheMiddleware(600), getAllAnime);
router.get("/:slug", cacheMiddleware(1000), getAnimeDetail);
router.post(
  "/",
  protect,
  restrictTo("admin"),
  uploadThumbnail.single("coverImage"),
  createAnime,
);

router
  .route("/:id")
  .patch(
    protect,
    restrictTo("admin"),
    uploadThumbnail.single("coverImage"),
    updateAnime,
  )
  .delete(protect, restrictTo("admin"), deleteAnime);

export default router;
