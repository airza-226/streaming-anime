import express from "express";
import { register, login } from "../controllers/auth.controller";
import { protect } from "../../middlewares/auth.middleware";
import { getUserProfile } from "../controllers/user.controller";
const router = express.Router();
router.post("/", register);
router.post("/login", login);
router.get('/profile',protect,getUserProfile)
export default router;
