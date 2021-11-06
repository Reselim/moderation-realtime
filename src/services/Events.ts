import Service from "../interface/Service"
import App from "../App"
import log from "../util/log"

const events = [
	"reportCreate",
	"reportDelete",
	"actionCreate",
	"actionDelete",
]

class Events implements Service {
	public app: App

	constructor(app: App) {
		this.app = app

		app.subscriber.on("message", (event: string, data: any) => {
			if (events.includes(event)) {
				const parsedData = JSON.parse(data)
				app.socket.send(event, parsedData)
			}
		})

		app.subscriber.subscribe(...events).then(() => log.debug("Subscribed to report events"))
	}
}

export default Events