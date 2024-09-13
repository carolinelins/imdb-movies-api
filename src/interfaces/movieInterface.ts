export interface MovieFiltersInterface {
  runtimeMin?: number
  runtimeMax?: number
  genres?: string[]
  title?: string
}

export interface MovieInterface {
  tconst: string
  title: string
  genres: string[]
  releaseYear: number
  runtime: number
  rating: number
  poster?: string
}

export interface MoviePosterInterface {
  tconst: string
  poster: string | null
}