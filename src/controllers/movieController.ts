import { Request, Response } from 'express'
import { getGenresService, getMoviesService } from '../services/movieService'
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
    genres: genres ? (Array.isArray(genres) ? genres.map(g => String(g)) : [String(genres)]) : [],
    title: title ? title.toString() : undefined,
    runtimeMin: runtimeMin ? parseInt(runtimeMin as string) : undefined,
    runtimeMax: runtimeMax ? parseInt(runtimeMax as string) : undefined,
  }

  const pageNumber = page ? parseInt(page as string, 10) : 0

  try {
    const movies = await getMoviesService(filters, sort?.toString(), pageNumber)
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
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

export {
  getMoviesController,
  getGenresController
}