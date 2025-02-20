import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { corsOptions } from '~/configs/cors'
import { checkOverload } from '~/configs/db/check-connect'
import { env } from '~/configs/env'
import limiter from '~/configs/rate-limit'
import { IS_PROD } from '~/constants'
import { generateOpenAPIDocument } from '~/docs'
import errorHandle from '~/middlewares/errorHandle'
import router from '~/routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(morgan(IS_PROD ? 'combined' : 'dev'))

if (IS_PROD) {
	app.set('trust proxy', true)
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
				},
			},
		})
	)
	app.use(compression())
	app.use(limiter)
}

// Db
import '~/configs/db'
env.DB_CHECK_OVERLOAD && checkOverload()

// Routes
router(app)

// Error Handle
app.use(errorHandle)

// API Docs
app.use('/docs', async (req, res) => {
	const { apiReference } = await import('@scalar/express-api-reference')
	return apiReference({
		spec: {
			content: generateOpenAPIDocument(),
		},
	})(req, res)
})

export { app }
