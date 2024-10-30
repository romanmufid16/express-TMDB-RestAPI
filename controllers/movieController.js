import movies from '../models/movies.js';
import dotenv from 'dotenv';

dotenv.config();

const getMovies = async (req, res) => {
  try {
    // Putting query in variable
    const movieId = parseInt(req.query.id);
    const language = req.query.language;

    // Query contains id and language
    if (movieId && language) {
      const movie = movies.find((m) => m.id === movieId && m.original_language === language);
      if (!movie) {
        return res.status(404).json({ message: 'No data found with this id and language.' });
      }

      return res.status(200).json(movie);
    }

    // Query only contain language
    if (language) {
      const movieByLanguage = movies.filter((m) => m.original_language === language);
      if (movieByLanguage.length === 0) {
        return res.status(404).json({ message: 'No data found for this language' });
      }
      return res.status(200).json(movieByLanguage);
    }

    // Query only contain id
    if (movieId) {
      const movieById = movies.find((m) => m.id === movieId);
      if (!movieById) {
        return res.status(404).json({ message: 'No data found for this id' });
      }
      return res.status(200).json(movieById);
    }

    // Without query, giving whole data in response
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { getMovies };