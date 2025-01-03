import { fetchFromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      content: response.results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while searching for the person",
    });
  }
};

const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      content: response.results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while searching for the movie",
    });
  }
};

const searchTv = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      content: response.results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while searching for the tv show",
    });
  }
};

const searchKeyword = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          title: response.results[0].name,
          searchType: "keyword",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      content: response.results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while searching for the keyword",
    });
  }
};

const getSearchHistory = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      content: req.user.searchHistory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching search history",
    });
  }
};

const removeItemFromSearchHistory = async (req, res) => {
  try {
    let { id } = req.params;

    id = parseInt(id); // If this line is not added, the id will be a string and the comparison will fail and that why item wont be removed from the search history

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Item removed from search history",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while removing item from search history",
    });
  }
};

export {
  searchPerson,
  searchMovie,
  searchTv,
  searchKeyword,
  getSearchHistory,
  removeItemFromSearchHistory,
};
