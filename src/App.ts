import IORedis, { Redis } from "ioredis"
import { Server } from "socket.io"
import Reports from "./services/Reports"
import env from "./util/option/env"
import log from "./util/log"

class App {
	public socket: Server

	public publisher: Redis
	public subscriber: Redis

	public reports: Reports

	constructor() {
		this.socket = new Server({
			path: "/",
			serveClient: false,
		})

		this.publisher = new IORedis(env.redisUrl, {  })
		this.subscriber = new IORedis(env.redisUrl)

		this.publisher.on("connect", () => log.debug("Publisher connected to Redis"))
		this.subscriber.on("connect", () => log.debug("Subscriber connected to Redis"))

		this.reports = new Reports(this)
	}

	public async start(): Promise<void> {
		this.socket.listen(env.port)
	}
}

export default App