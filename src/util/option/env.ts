type Environment = {
	nodeEnv?: string,
	port: number,
	redisUrl: string,
	jwtSecret: string,
}

function getEnvironmentVariable(name: string, required: true): string | never
function getEnvironmentVariable(name: string, required?: false): string | undefined
function getEnvironmentVariable(name: string, required?: boolean): string | undefined | never {
	const value = process.env[name]
	if (required && !value) throw new Error(`Environment variable "${name}" is required`)
	return value
}

const env = {
	nodeEnv: getEnvironmentVariable("NODE_ENV"),
	port: getEnvironmentVariable("PORT") ?? 80,
	redisUrl: getEnvironmentVariable("REDIS_URL", true),
	jwtSecret: getEnvironmentVariable("JWT_SECRET", true),
} as Environment

export default env