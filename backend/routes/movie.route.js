import express from "express";

const router = express.Router();
import {
  getTrendingMovies,
  getMovieTrailer,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
} from "../controllers/movie.controller.js";

import { protectRoute } from "../middleware/protectRoute.js";

router.get("/trending", getTrendingMovies);
router.get("/:id/trailers", protectRoute, getMovieTrailer);
router.get("/:id/details", protectRoute, getMovieDetails);
router.get("/:id/similar", protectRoute, getSimilarMovies);
router.get("/:category", protectRoute, getMoviesByCategory);

export default router;
