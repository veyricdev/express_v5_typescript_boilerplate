import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { corsOptions } from '~/configs/cors'
import limiter from '~/configs/rate-limit'
import { IS_PROD } from '~/constants'
import router from '~/routes'

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
