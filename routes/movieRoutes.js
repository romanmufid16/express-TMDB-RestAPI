import { getMovies } from '../controllers/movieController.js';
import express from 'express';

const routes = express.Router();

routes.get('/movies', getMovies);


export default routes;