import chalk from 'chalk'

class Logger {
	static logLevel: string

	constructor() {
		Logger.logLevel = process.env.LOG_LEVEL || 'info'
	}

	static info(message: string): void {
		if (Logger.logLevel === 'info' || Logger.logLevel === 'debug') {
			console.log(chalk.blue(`[INFO] ${message}`))
		}
	}

	static error(message: string): void {
		console.error(chalk.red(`[ERROR] ${message}`))
	}

	static debug(message: string): void {
		if (this.logLevel === 'debug') {
			console.debug(chalk.yellow(`[DEBUG] ${message}`))
		}
	}
}

export default Logger
