import type { Express } from 'express'
import errorHandle from '~/middlewares/errorHandle'
import errorsRouter from './errors'

export const router = (app: Express) => {
	app.get('/ping', (_req, res) => {
		res.status(200).send('pong!')
	})

	app.use('/errors', errorsRouter)

	// Error Handle
	app.use(errorHandle)
}

export default router
