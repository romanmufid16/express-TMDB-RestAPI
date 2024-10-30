import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';
import movies from './models/movies.js';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

// Fetching data form TMDB to be save in movies array when server started
const fetchMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
  const token = process.env.ACCESS_TOKEN;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    movies.push(...data.results);
    console.log('Movies stored successfully');
  } catch (error) {
    console.error(error);
  }
};

fetchMovies();
app.use('/api', movieRoutes);


app.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`);
});