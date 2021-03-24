import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import tweetRoute from './routes/tweetRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.use('/api/tweets', tweetRoute)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`Server Is Running In ${process.env.NODE_ENV} Mode  On Port ${PORT}`.yellow.bold)
})