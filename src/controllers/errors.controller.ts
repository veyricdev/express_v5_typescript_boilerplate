import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/core/ApiError'
import { catchAsync } from '~/utils/catchAsync'

const ErrorsController = {
	// pass through error default express v5
	get404(_req: Request, _res: Response, _next: NextFunction) {
		throw new ApiError('Page Not Found!', StatusCodes.NOT_FOUND)
	},

	get500: catchAsync(async (_req: Request, _res: Response, _next: NextFunction) => {
		throw 'Server Error!'
	}),
}

export default ErrorsController
