import mongoose from 'mongoose'
import { env } from '../env'
import { logger } from '../logger'
import { countConnect } from './check-connect'
import config from './config'

const { host, name, port, collection, minPoolSize, maxPoolSize, serverSelectionTimeoutMS, socketTimeoutMS } = config

const connectString = `mongodb://${host}:${port}/${name}`

const options = {
	dbName: collection,
	minPoolSize,
	maxPoolSize,
	serverSelectionTimeoutMS,
	socketTimeoutMS,
}

class Database {
	static instance: Database | undefined

	constructor() {
		this.connect()
	}

	// connect
	connect() {
		if (!env.DB_DEBUG) {
			mongoose.set('debug', true)
			mongoose.set('debug', { color: true })
		}

		mongoose
			.connect(connectString, options)
			.then((_) => {
				logger.info(`Connected Mongodb Success PRO! \nNumber connect: ${countConnect()}`)
			})
			.catch((err) => logger.error('Error Connect!', err))
	}

	static getInstance() {
		if (!Database.instance) Database.instance = new Database()

		return Database.instance
	}
}

const instanceMongodb = Database.getInstance()
export default instanceMongodb
