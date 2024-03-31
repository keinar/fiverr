import { loggerService } from "../services/logger.service.js"

export function log(req, res, next) {
	var { _id } = req.params
	loggerService.info(`The following order was added: ${_id}`)
	
	next()
}