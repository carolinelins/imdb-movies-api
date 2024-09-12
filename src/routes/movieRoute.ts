import { Router } from 'express'
import { getGenresController, getMoviesController } from '../controllers/movieController'

const router = Router()

router.get('/movies', getMoviesController)
router.get('/genres', getGenresController)

export default router
