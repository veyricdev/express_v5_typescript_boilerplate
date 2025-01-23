import 'dotenv/config'
import { bool, cleanEnv, host, num, port, str } from 'envalid'

export const env = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ['dev', 'prod', 'test'], default: 'dev' }),
	APP_NAME: str({ default: 'Express V5 Typescript Boilerplate' }),
	HOST: host({ default: 'localhost' }),
	PORT: port({ default: 6606 }),
	LOG_DEBUG: bool({ default: true }),
	LOG_FILE: bool({ default: true }),

	// db
	DB_DEBUG: bool({ default: true }),
	DB_CHECK_OVERLOAD: bool({ default: false }),
	// db dev
	DEV_DB_HOST: host({ default: 'localhost' }),
	DEV_DB_PORT: port({ default: 27017 }),
	DEV_DB_NAME: str({ default: 'express-boilerplate' }),
	DEV_DB_COLLECTION: str({ default: 'express-boilerplate' }),
	DEV_DB_POOL_MIN: num({ default: 10 }),
	DEV_DB_POOL_MAX: num({ default: 50 }),
	DEV_DB_SELECTION_TIMEOUT: num({ default: 5000 }),
	DEV_DB_SOCKET_TIMEOUT: num({ default: 45000 }),
	// db prod
	PROD_DB_HOST: host({ default: 'localhost' }),
	PROD_DB_PORT: port({ default: 27017 }),
	PROD_DB_NAME: str({ default: 'express-boilerplate' }),
	PROD_DB_COLLECTION: str({ default: 'express-boilerplate' }),
	PROD_DB_POOL_MIN: num({ default: 10 }),
	PROD_DB_POOL_MAX: num({ default: 50 }),
	PROD_DB_SELECTION_TIMEOUT: num({ default: 5000 }),
	PROD_DB_SOCKET_TIMEOUT: num({ default: 45000 }),

	// Telegram
	TELE_BOT_TOKEN: str({ default: '' }),
	TELE_CHAT_ID: str({ default: '' }),
})
