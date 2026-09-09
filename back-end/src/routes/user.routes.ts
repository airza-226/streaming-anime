import express from "express";

import { protect } from "../middlewares/auth.middleware";
import { getMyBookmarks, getUserProfile, toggleBookmark } from "../controllers/user.controller";
const router = express.Router();
router.use(protect)
router.get('/profile',protect,getUserProfile)
router.get('/bookmarks',getMyBookmarks)
router.post('/bookmarks/:animeId', toggleBookmark)
export default router;
