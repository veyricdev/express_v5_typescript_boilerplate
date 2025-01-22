import { apiReference } from '@scalar/express-api-reference'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { corsOptions } from '~/configs/cors'
import limiter from '~/configs/rate-limit'
import { IS_PROD } from '~/constants'
import router from '~/routes'
import { generateOpenAPIDocument } from './docs'
import errorHandle from './middlewares/errorHandle'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(morgan(IS_PROD ? 'combined' : 'dev'))

if (IS_PROD) {
	app.use(helmet())
	app.use(compression())
	app.use(limiter)
}

// Routes
router(app)

// Error Handle
app.use(errorHandle)

// API Docs
app.use(
	'/docs',
	apiReference({
		spec: {
			content: generateOpenAPIDocument(),
		},
	})
)

export { app }
