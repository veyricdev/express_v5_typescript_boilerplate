import type { NextFunction, Request, Response } from 'express'
import ApiError from '~/core/ApiError'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch((err) => next(err instanceof ApiError ? err : new ApiError(err)))
}
