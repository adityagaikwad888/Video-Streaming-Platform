import express from "express";

const router = express.Router();

import {
  getTrendingTvs,
  getTvTrailer,
  getTvDetails,
  getSimilarTvs,
  getTvsByCategory,
} from "../controllers/tv.controller.js";

import { protectRoute } from "../middleware/protectRoute.js";

router.get("/trending", getTrendingTvs);
router.get("/:id/trailers", protectRoute, getTvTrailer);
router.get("/:id/details", protectRoute, getTvDetails);
router.get("/:id/similar", protectRoute, getSimilarTvs);
router.get("/:category", protectRoute, getTvsByCategory);

export default router;
