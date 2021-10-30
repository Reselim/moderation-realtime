import App from "./App"
import log from "./util/log"
import env from "./util/option/env"

(async () => {
	const app = new App()
	await app.start()
	log.info(`Listening on port ${env.port}`)
})()