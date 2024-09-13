import { Router } from 'express'
import { getGenresController, getMoviePostersController, getMoviesController } from '../controllers/movieController'

const router = Router()

router.get('/movies', getMoviesController)
router.get('/genres', getGenresController)
router.get('/posters', getMoviePostersController)

export default router
