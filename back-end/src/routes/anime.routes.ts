import { Router } from "express";
import { createAnime, getAllAnime, getAnimeBySlug } from "../controllers/anime.controller";
import { protect } from "../middlewares/auth.middleware";
const router = Router()
router.get('/',getAllAnime)
router.get('/:slug',getAnimeBySlug)
router.post('/',protect,createAnime)
export default router