import express from 'express'
import cors from 'cors'
import movieRoutes from './routes/movieRoute'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', movieRoutes)

const port = 8000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})