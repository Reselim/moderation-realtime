import App from "../App"
import Service from "../interface/Service"
import env from "../util/option/env"
import { verify } from "jsonwebtoken"
import Token from "../types/Token"

class Auth implements Service {
	public app: App

	constructor(app: App) {
		this.app = app

		app.socket.use((socket, next) => {
			const token = socket.handshake.auth.token as string | undefined

			if (token) {
				let tokenData: Token

				try {
					tokenData = verify(token, env.jwtSecret) as Token
				} catch {
					return next(new Error("Authentication error"))
				}

				socket.data.token = tokenData

				return next()
			} else {
				return next(new Error("No token provided"))
			}
		})
	}
}

export default Auth