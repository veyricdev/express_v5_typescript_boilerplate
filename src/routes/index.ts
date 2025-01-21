import type { Express } from 'express'

export const router = (app: Express) => {
	app.get('/ping', (_req, res) => {
		res.status(200).send('pong!')
	})
}

export default router
