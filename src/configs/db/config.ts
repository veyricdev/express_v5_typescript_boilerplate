import { IS_PROD } from '~/constants'
import { env } from '../env'

type Config = {
	host?: string
	port?: number
	name?: string
	collection?: string
	minPoolSize?: number
	maxPoolSize?: number
	serverSelectionTimeoutMS?: number
	socketTimeoutMS?: number
}

type DbConfig = {
	dev: Config
	prod: Config
}

const dbConfig: DbConfig = {
	dev: {
		host: env.DEV_DB_HOST,
		port: env.DEV_DB_PORT,
		name: env.DEV_DB_NAME,
		collection: env.DEV_DB_COLLECTION,
		minPoolSize: env.DEV_DB_POOL_MIN,
		maxPoolSize: env.DEV_DB_POOL_MAX,
		serverSelectionTimeoutMS: env.DEV_DB_SELECTION_TIMEOUT,
		socketTimeoutMS: env.DEV_DB_SOCKET_TIMEOUT,
	},
	prod: {
		host: env.PROD_DB_HOST,
		port: env.PROD_DB_PORT,
		name: env.PROD_DB_NAME,
		collection: env.PROD_DB_COLLECTION,
		minPoolSize: env.PROD_DB_POOL_MIN,
		maxPoolSize: env.PROD_DB_POOL_MAX,
		serverSelectionTimeoutMS: env.PROD_DB_SELECTION_TIMEOUT,
		socketTimeoutMS: env.PROD_DB_SOCKET_TIMEOUT,
	},
}

const config = IS_PROD ? dbConfig.prod : dbConfig.dev

export default config
