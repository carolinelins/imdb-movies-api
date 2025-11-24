import { Router } from 'express'
import { getGenresController, getMoviePostersController, getMoviesController, getRecommendationsController } from '../controllers/movieController'

const router = Router()

router.get('/movies', getMoviesController)
router.get('/genres', getGenresController)
router.get('/posters', getMoviePostersController)
router.get('/recommendations', getRecommendationsController)

export default router
