import movies from '../models/movies.js';
import dotenv from 'dotenv';

dotenv.config();


const getMovies = async (req, res) => {
  try {
    const movieId = parseInt(req.query.id);
    const language = req.query.language;

    if (movieId && language) {
      const movie = movies.find((m) => m.id === movieId && m.original_language === language);
      if (!movie) {
        return res.status(404).json({ message: 'No data found with this id and language.' });
      }

      return res.status(200).json(movie);
    }

    if (language) {
      const movieByLanguage = movies.filter((m) => m.original_language === language);
      if (movieByLanguage.length === 0) {
        return res.status(404).json({ message: 'No data found for this language' });
      }
      return res.status(200).json(movieByLanguage);
    }

    if (movieId) {
      const movieById = movies.find((m) => m.id === movieId);
      if (!movieById) {
        return res.status(404).json({ message: 'No data found for this id' });
      }
      return res.status(200).json(movieById);
    }

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// const getMovieById = async (req, res) => {
//   try {
//     const movieId = parseInt(req.query.id);

//     if (isNaN(movieId)) {
//       res.status(400).json({ message: 'Invalid id' });
//     }

//     const movie = movies.filter((m) => m.id === movieId)[0];
//     if (!movie) {
//       res.status(400).json({ message: 'Theres no movie with this id'})
//     }
//     res.status(200).json(movie);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getMovieByLanguage = async (req, res) => {
//   try {
//     const language = req.query.language;
//     if (!typeof language === 'string') {
//       res.status(400).json({ message: 'Invalid input' });
//     }

//     const movie = movies.filter((m) => m.original_language === language);
//     res.status(200).json(movie);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


export { getMovies };