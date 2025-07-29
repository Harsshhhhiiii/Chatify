import express from "express";
import { flirtfunction } from "../controllers/aisuggestions.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/flirt/:id", protectRoute, flirtfunction);

export default router;



