import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/configs/env'
import { logger } from '~/configs/logger'
import bot from '~/configs/telegraf'
import loggerWinston from '~/configs/winston'
import ApiError from '~/core/ApiError'

export default function errorHandle(err: Error, _req: Request, res: Response, _next: NextFunction) {
	env.LOG_DEBUG && logger.error(err.stack)
	env.LOG_FILE && loggerWinston.error(err)

	const statusCode = err instanceof ApiError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR

	const data = {
		code: statusCode,
		message: err.message || err,
	}

	if (env.TELE_BOT_TOKEN && env.TELE_CHAT_ID) {
		bot.telegram
			.sendMessage(
				env.TELE_CHAT_ID,
				`
							\[${env.NODE_ENV.toUpperCase()}\] ${env.APP_NAME}
							Error:
								code: \`${statusCode}\`
								message: \`${err.message}\`
								stack:
									\`\`\`
										${err.stack}
									\`\`\`
						`,
				{
					parse_mode: 'MarkdownV2',
				}
			)
			.catch((err) => {
				logger.error(err)
			})
	}

	res.status(statusCode).json(data)
}
