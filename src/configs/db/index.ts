import mongoose from 'mongoose'
import { env } from '../env'
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
				console.log(`Connected Mongodb Success PRO! \nNumber connect: ${countConnect()}`)
			})
			.catch((err) => console.error('Error Connect!', err))
	}

	static getInstance() {
		if (!Database.instance) Database.instance = new Database()

		return Database.instance
	}
}

const instanceMongodb = Database.getInstance()
export default instanceMongodb
