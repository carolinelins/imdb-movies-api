import { MovieInterface, MovieFiltersInterface, MoviePosterInterface } from '../interfaces/movieInterface'
import { countMovies, getGenres, getMovies, updateMoviePoster } from '../repositories/movieRepository'
import fetchPosterSrc from '../utils/fetchPoster'

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
