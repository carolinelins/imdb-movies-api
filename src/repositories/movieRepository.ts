import pool from '../config/db'
import { MovieFiltersInterface, MovieInterface } from '../interfaces/movieInterface'

async function getMovies(filters: MovieFiltersInterface, sort?: string, page: number = 0): Promise<MovieInterface[]> {
  const limit = 18
  const offset = page * limit

  const query = `
    SELECT tconst, title, genres, release_year AS "releaseYear", runtime, rating, poster FROM imdb_movies WHERE 1=1
    ${filters.genres && filters.genres.length > 0
      ? ` AND EXISTS (SELECT 1 FROM unnest(genres) AS g WHERE g IN (${filters.genres.map(el => `'${el}'`).join(', ')}))`
      : ''
    }
    ${filters.title ? ` AND title ILIKE '%${filters.title}%'` : ''}
    ${filters.runtimeMin ? ` AND runtime >= ${filters.runtimeMin}` : ''}
    ${filters.runtimeMax ? ` AND runtime <= ${filters.runtimeMax}` : ''}
    ${sort ? ` ORDER BY ${sort === 'title ASC' || sort === 'title DESC' ? sort : `${sort}, title ASC`} NULLS LAST` : ''}
    LIMIT ${limit} OFFSET ${offset}
  `

  const result = await pool.query(query)
  return result.rows
}

async function countMovies(filters: MovieFiltersInterface): Promise<number> {
  const query = `
  SELECT COUNT(*) FROM imdb_movies WHERE 1=1
    ${filters.genres && filters.genres.length > 0
      ? ` AND EXISTS (SELECT 1 FROM unnest(genres) AS g WHERE g IN (${filters.genres.map(el => `'${el}'`).join(', ')}))`
      : ''
    }
    ${filters.title ? ` AND title ILIKE '%${filters.title}%'` : ''}
    ${filters.runtimeMin ? ` AND runtime >= ${filters.runtimeMin}` : ''}
    ${filters.runtimeMax ? ` AND runtime <= ${filters.runtimeMax}` : ''}
  `
  const result = await pool.query(query)
  return result.rows[0].count
}

async function getGenres(): Promise<string[]> {
  const query = 'SELECT DISTINCT genre FROM (SELECT UNNEST(genres) AS genre FROM imdb_movies);'

  const result = await pool.query(query)
  return result.rows.map(el => el.genre)
}

async function updateMoviePoster(tconst: string, poster: string): Promise<void> {
  const query = `UPDATE imdb_movies SET poster='${poster}' WHERE tconst='${tconst}';`

  await pool.query(query)
}

export {
  getMovies,
  countMovies,
  getGenres,
  updateMoviePoster
}