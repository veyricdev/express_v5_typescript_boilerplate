import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'

import router from '~/routes'
import limiter from '~/configs/rate-limit'
import { corsOptions } from '~/configs/cors'
import { IS_PROD } from '~/constants'

const app = express()

// Set the application to trust the reverse proxy
app.set('trust proxy', true)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

if (IS_PROD) {
  app.use(helmet())
  app.use(compression())
  app.use(limiter)
}

// Routes
router(app)

export { app }
