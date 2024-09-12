import { MovieInterface, MovieFiltersInterface } from '../interfaces/movieInterface'
import { countMovies, getGenres, getMovies, updateMoviePoster } from '../repositories/movieRepository'
import fetchPosterSrc from '../utils/fetchPoster'

async function getMoviesService(filters: MovieFiltersInterface, sort?: string, page: number = 1): Promise<{ movies: MovieInterface[], count: number }> {
  const movies = await getMovies(filters, sort, page)
  const count = await countMovies(filters)

  for (const movie of movies) {
    if (!movie.poster) {
      const poster = await fetchPosterSrc(movie.tconst)
      if (poster) {
        updateMoviePoster(movie.tconst, poster)
        movie.poster = poster
      }
    }
  }

  return { movies, count }
}

async function getGenresService(): Promise<string[]> {
  return await getGenres()
}

export {
  getMoviesService,
  getGenresService
}
