import { levelPredict } from "../controllers/levelController.js";
import { Router } from "express";

const router = Router()

router.route("/predict").post(levelPredict);

export default router;