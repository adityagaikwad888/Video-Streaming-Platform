import { fetchFromTMDB } from "../services/tmdb.service.js";

const getTrendingMovies = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.status(200).json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMovieTrailer = async (req, res) => {
  try {
    const movieId = req.params.id;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`
    );

    res.status(200).json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    } else {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const movieId = req.params.id;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
    );
    res.status(200).json({
      success: true,
      content: data,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    } else {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
};

const getSimilarMovies = async (req, res) => {
  try {
    const movieId = req.params.id;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`
    );
    res.status(200).json({
      success: true,
      similar: data.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    } else {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
};

const getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export {
  getTrendingMovies,
  getMovieTrailer,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
};
