import { env } from '~/configs/env'

export const A_SECOND = 1000
export const ONE_KB = 1024

export const IS_PROD = env.NODE_ENV.includes('prod')
