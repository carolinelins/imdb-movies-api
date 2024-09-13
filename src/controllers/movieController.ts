import { Request, Response } from 'express'
import { getGenresService, getMoviePostersService, getMoviesService } from '../services/movieService'
import { MovieFiltersInterface } from '../interfaces/movieInterface'

async function getMoviesController(req: Request, res: Response): Promise<void> {
  const {
    genres,
    title,
    runtimeMin,
    runtimeMax,
    sort,
    page
  } = req.query

  const filters: MovieFiltersInterface = {
    genres: genres ? (Array.isArray(genres) ? genres.map(val => String(val)) : [String(genres)]) : [],
    title: title ? title.toString() : undefined,
    runtimeMin: runtimeMin ? parseInt(runtimeMin as string) : undefined,
    runtimeMax: runtimeMax ? parseInt(runtimeMax as string) : undefined,
  }

  const pageNumber = page ? parseInt(page as string, 10) : 0

  try {
    const movies = await getMoviesService(filters, sort?.toString(), pageNumber)
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

async function getGenresController(req: Request, res: Response): Promise<void> {
  try {
    const genres = await getGenresService()
    res.status(200).json(genres)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

async function getMoviePostersController(req: Request, res: Response): Promise<void> {
  const tconsts = req.query.tconsts ? Array.isArray(req.query.tconsts) ? req.query.tconsts.map(val => String(val)) : [String(req.query.tconsts)] : []

  try {
    const moviePosters = await getMoviePostersService(tconsts)
    res.status(200).json(moviePosters)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export {
  getMoviesController,
  getGenresController,
  getMoviePostersController
}