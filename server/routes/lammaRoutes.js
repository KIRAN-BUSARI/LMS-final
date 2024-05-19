import { Router } from "express";
import { ask } from "../controllers/llama.js";
const router = Router();

router.post('/ask', ask);

export default router;