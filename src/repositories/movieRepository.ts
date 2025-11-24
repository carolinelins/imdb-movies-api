import pool from '../config/db'
import { MovieInterface, MovieFiltersInterface } from '../interfaces/movieInterface'

interface RecommendationFilters {
  genres: string[]
  avgRuntime: number
  avgRating: number
  avgYear: number
  excludeTconsts: string[]
}

async function getRecommendedMovies(filters: RecommendationFilters): Promise<MovieInterface[]> {
  const runtimeTolerance = 20
  const ratingTolerance = 1
  const yearTolerance = 5
  const limit = 12

  const safeNumber = (val: any, fallback: number) =>
    typeof val === 'number' && !isNaN(val) ? val : fallback

  const avgRuntime = safeNumber(filters.avgRuntime, 90)
  const avgRating = safeNumber(filters.avgRating, 5)
  const avgYear = safeNumber(filters.avgYear, 2000)

  const minRuntime = avgRuntime - runtimeTolerance
  const maxRuntime = avgRuntime + runtimeTolerance
  const minRating = avgRating - ratingTolerance
  const maxRating = avgRating + ratingTolerance
  const minYear = avgYear - yearTolerance
  const maxYear = avgYear + yearTolerance

  const excludeTconstsQuery = filters.excludeTconsts?.length
    ? `AND tconst NOT IN (${filters.excludeTconsts.map(t => `'${t}'`).join(',')})`
    : ''

  const genresQuery = filters.genres?.length
    ? `AND EXISTS (
        SELECT 1 FROM unnest(genres) AS g
        WHERE g IN (${filters.genres.map(g => `'${g}'`).join(',')})
      )`
    : ''

  const query = `
    SELECT tconst, title, genres, release_year AS "releaseYear", runtime, rating, poster
    FROM imdb_movies
    WHERE 1=1
      ${excludeTconstsQuery}
      ${genresQuery}
      AND runtime IS NOT NULL
      AND rating IS NOT NULL
      AND release_year IS NOT NULL
      AND runtime BETWEEN ${minRuntime} AND ${maxRuntime}
      AND rating BETWEEN ${minRating} AND ${maxRating}
      AND release_year BETWEEN ${minYear} AND ${maxYear}
    ORDER BY RANDOM()
    LIMIT ${limit}
  `
  const result = await pool.query(query)
  return result.rows
}


async function getMovies(filters: MovieFiltersInterface, sort?: string, page: number = 0): Promise<MovieInterface[]> {
  const limit = 12
  const offset = page * limit

  let orderClause = ''
  if (sort) {
    const isTitleSort = sort === 'title ASC' || sort === 'title DESC'
    if (isTitleSort) {
      orderClause = ` ORDER BY ${sort} NULLS LAST`
    } else if (sort === 'RANDOM()') {
      orderClause = ` ORDER BY ${sort}`
    } else {
      orderClause = ` ORDER BY ${sort} NULLS LAST, title ASC NULLS LAST`
    }
  }

  const query = `
    SELECT tconst, title, genres, release_year AS "releaseYear", runtime, rating, poster FROM imdb_movies WHERE 1=1
    ${filters.genres && filters.genres.length > 0
      ? ` AND EXISTS (SELECT 1 FROM unnest(genres) AS g WHERE g IN (${filters.genres.map(el => `'${el}'`).join(', ')}))`
      : ''
    }
    ${filters.title ? ` AND title ILIKE '%${filters.title}%'` : ''}
    ${filters.runtimeMin ? ` AND runtime >= ${filters.runtimeMin}` : ''}
    ${filters.runtimeMax ? ` AND runtime <= ${filters.runtimeMax}` : ''}
    ${orderClause}
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
  updateMoviePoster,
  getRecommendedMovies
}