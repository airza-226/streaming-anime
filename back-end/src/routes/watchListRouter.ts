import { Router } from "express";
import { upsertWatchList,getUserWatchList,removeFromWatchList } from "../controllers/watchlist.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();
router.use(protect);

router
  .route("/")
  .get(getUserWatchList)      
  .post(upsertWatchList);    
router
  .route("/:animeId")
  .delete(removeFromWatchList); 

export default router;