import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { protectRoute } from "./middleware/protectRoute.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const server = express();

dotenv.config();
const port = ENV_VARS.PORT;

server.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
server.use(express.json()); // allows us to parss req.body in json format
server.use(cookieParser()); // allows us to parse cookies

server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/movies", movieRoutes);
server.use("/api/v1/tv", tvRoutes);
server.use("/api/v1/search", protectRoute, searchRoutes);

server.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
  connectDB();
});
