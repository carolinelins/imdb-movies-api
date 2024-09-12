import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'imdb_movies',
  password: '123456',
  port: 5416
})

export default pool