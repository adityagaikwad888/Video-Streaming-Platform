import dotenv from "dotenv";

dotenv.config();

const ENV_VARS = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};

export { ENV_VARS }; // We don't used modeule.exports because we are using ES6 module system. We use export instead of module.exports.
