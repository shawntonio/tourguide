module.exports = {
	createContent(req, res) {
		const db = req.app.get('db')
		const {url, tour_id} = req.body
		const {lat, lng} = req.body.location

		db.addContent({url, tour_id, lat, lng})
		.then(() => res.sendStatus(200))
		.catch(err => res.send(err))
	}
}