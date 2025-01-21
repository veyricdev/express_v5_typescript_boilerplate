import { StatusCodes } from 'http-status-codes'

class ApiError extends Error {
	statusCode
	constructor(message: string, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
		super(message)

		this.name = 'ApiError'

		// Assign our http status code here
		this.statusCode = statusCode

		// Record the Stack Trace to facilitate debugging
		Error.captureStackTrace(this, this.constructor)
	}
}

export default ApiError
