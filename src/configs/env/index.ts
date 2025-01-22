import 'dotenv/config'
import { bool, cleanEnv, host, port, str } from 'envalid'

export const env = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ['dev', 'prod', 'test'], default: 'dev' }),
	HOST: host({ default: 'localhost' }),
	PORT: port({ default: 6606 }),
	LOG_DEBUG: bool({ default: true }),
	LOG_FILE: bool({ default: true }),
})
