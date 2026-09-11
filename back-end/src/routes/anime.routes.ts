import { Router } from "express";
import {
  createAnime,
  getAllAnime,
  getAnimeDetail,
  updateAnime,
} from "../controllers/anime.controller";
import { protect, restrictTo } from "../middlewares/auth.middleware";
import { uploadThumbnail } from "../middlewares/upload.middleware";
const router = Router();
router.get("/", getAllAnime);
router.get("/:slug", getAnimeDetail);
router.post("/", protect, restrictTo("admin"), createAnime);
router.post("/",protect,restrictTo('admin'),uploadThumbnail.single('coverImage'),createAnime)
router.post("/:id", protect, restrictTo("admin"), updateAnime);
router.post("/", protect, restrictTo("admin"), createAnime);
export default router;
