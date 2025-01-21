import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/configs/env'
import { logger } from '~/configs/logger'
import ApiError from '~/core/ApiError'

export default function errorHandle(err: Error, _req: Request, res: Response, _next: NextFunction) {
	env.LOG_DEBUG && logger.error(err.stack)

	const statusCode = err instanceof ApiError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
	res.status(statusCode).json({
		code: statusCode,
		message: err.message || err,
	})
}
