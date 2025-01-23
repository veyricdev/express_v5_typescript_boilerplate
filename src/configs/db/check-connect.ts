import os from 'node:os'
import process from 'node:process'
import mongoose from 'mongoose'
import { A_SECOND, ONE_KB } from '~/constants'

const _SECONDS = A_SECOND * 5

// count connect
const countConnect = () => mongoose.connections.length

// check over load
const checkOverload = () => {
	setInterval(() => {
		const numConnection = mongoose.connections.length
		const numCores = os.cpus().length
		const memoryUsage = process.memoryUsage().rss

		// Exp maximum number of connections based on number ofs cores
		const maxConnections = numCores * 5

		console.log(`Active connections::${numConnection}`)
		console.log(`Memory usage::${memoryUsage / ONE_KB / ONE_KB} MB`)

		if (numConnection > maxConnections) console.log('Connections overload detected!')
	}, _SECONDS)
}

export { countConnect, checkOverload }
