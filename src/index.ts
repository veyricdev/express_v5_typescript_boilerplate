import { env } from '~/configs/env'
import { logger } from '~/configs/logger'
import { A_SECOND } from '~/constants'
import { app } from '~/server'

const PORT = env.PORT || 6606

const server = app.listen(PORT, (error) => {
	if (error) logger.error(error.message)
	else logger.info(`🚀 Server ${env.NODE_ENV.toUpperCase()} ready at http://${env.HOST}:${PORT}/ping...`)
})

const onCloseSignal = () => {
	logger.info('sigint received, shutting down...')
	server.close(() => {
		logger.info('Server closed!')
		process.exit()
	})
	setTimeout(() => process.exit(1), 3 * A_SECOND).unref()
}

process.on('SIGINT', onCloseSignal)
process.on('SIGTERM', onCloseSignal)
