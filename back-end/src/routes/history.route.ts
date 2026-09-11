import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import {
  getWatchHistory,
  updateProgress,
} from "../controllers/history.controller";

const router = Router();
router.use(protect);
router.route("/").get(getWatchHistory).post(updateProgress);
export default router;
