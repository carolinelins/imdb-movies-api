import { MovieInterface, MovieFiltersInterface, MoviePosterInterface } from '../interfaces/movieInterface'
import { countMovies, getGenres, getMovies, updateMoviePoster, getRecommendedMovies } from '../repositories/movieRepository'
import fetchPosterSrc from '../utils/fetchPoster'

export async function getRecommendedMoviesService(clickedMovies: MovieInterface[]): Promise<MovieInterface[]> {
  if (!clickedMovies.length) return []

  const validRuntimes = clickedMovies.map(m => m.runtime).filter(v => typeof v === 'number' && !isNaN(v))
  const validRatings = clickedMovies.map(m => m.rating).filter(v => typeof v === 'number' && !isNaN(v))
  const validYears = clickedMovies.map(m => m.releaseYear).filter(v => typeof v === 'number' && !isNaN(v))

  const avgRuntime = validRuntimes.length
    ? Math.round(validRuntimes.reduce((sum, v) => sum + v, 0) / validRuntimes.length)
    : 90

  const avgRating = validRatings.length
    ? validRatings.reduce((sum, v) => sum + v, 0) / validRatings.length
    : 5

  const avgYear = validYears.length
    ? Math.round(validYears.reduce((sum, v) => sum + v, 0) / validYears.length)
    : 2000

  const genres = Array.from(new Set(clickedMovies.flatMap(m => m.genres)))
  const excludeTconsts = clickedMovies.map(m => m.tconst)

  return await getRecommendedMovies({
    genres,
    avgRuntime,
    avgRating,
    avgYear,
    excludeTconsts
  })
}



async function getMoviesService(filters: MovieFiltersInterface, sort?: string, page: number = 1): Promise<{ movies: MovieInterface[], count: number }> {
  const movies = await getMovies(filters, sort, page)
  const count = await countMovies(filters)

  return { movies, count }
}

async function getGenresService(): Promise<string[]> {
  return await getGenres()
}

async function getMoviePostersService(tconsts: string[]): Promise<MoviePosterInterface[]> {
  const moviePosters: MoviePosterInterface[] = []

  for (const tconst of tconsts) {
    const poster = await fetchPosterSrc(tconst) || null
    if (poster) updateMoviePoster(tconst, poster)
    moviePosters.push({ tconst, poster })
  }

  return moviePosters
}

export {
  getMoviesService,
  getGenresService,
  getMoviePostersService
}
