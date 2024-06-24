import express from 'express'
import cors from 'cors'
import DutyRoutes from './routes/DutyRoutes'

const app = express()
const port = 3000

app.use(cors()) // This will allow all CORS requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', DutyRoutes)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})