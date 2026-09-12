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
import { validate } from "../middlewares/validate.middleware";
import { createAnimeSchema, updateAnimeSchema } from "../schemas/anime.schema";

const router = Router();
router.get("/", cacheMiddleware(600), getAllAnime);
router.get("/:slug", cacheMiddleware(1000), getAnimeDetail);
router.post(
  "/",
  protect,
  restrictTo("admin"),
  uploadThumbnail.single("coverImage"), 
  validate(createAnimeSchema),          
  createAnime
);

router
  .route("/:id")
  .patch(
    protect,
    restrictTo("admin"),
    uploadThumbnail.single("coverImage"),
    validate(updateAnimeSchema),       
    updateAnime
  )
  .delete(
    protect, 
    restrictTo("admin"), 
    deleteAnime
  );

export default router;