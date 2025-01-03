import express from "express";

const router = express.Router();

import {
  searchPerson,
  searchMovie,
  searchTv,
  searchKeyword,
  getSearchHistory,
  removeItemFromSearchHistory,
} from "../controllers/search.controller.js";

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/keyword/:query", searchKeyword);

router.get("/history", getSearchHistory);
router.delete("/removehistory/:id", removeItemFromSearchHistory);

export default router;
