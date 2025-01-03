import { fetchFromTMDB } from "../services/tmdb.service.js";

const getTrendingTvs = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US`
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.status(200).json({
      success: true,
      content: randomTv,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTvTrailer = async (req, res) => {
  try {
    const tvId = req.params.id;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`
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

const getTvDetails = async (req, res) => {
  try {
    const tvId = req.params.id;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${tvId}?language=en-US`
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

const getSimilarTvs = async (req, res) => {
  try {
    const tvId = req.params.id;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${tvId}/similar?language=en-US&page=1`
    );
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTvsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  getTrendingTvs,
  getTvTrailer,
  getTvDetails,
  getSimilarTvs,
  getTvsByCategory,
};
