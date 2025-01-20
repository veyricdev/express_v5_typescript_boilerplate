import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import router from './routes'

const app = express()

// Set the application to trust the reverse proxy
app.set('trust proxy', true)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

// Routes
router(app)

export { app }
