const AwsCtrl = require('./AwsCtrl')

module.exports = {
	createContent(req, res) {
		const db = req.app.get('db')
		const {url, tour_id, object_key} = req.body
		const {lat, lng} = req.body.location

		db.addContent({url, tour_id, lat, lng, object_key})
		.then(() => res.sendStatus(200))
		.catch(err => res.send(err))
	},

	readContent(req, res) {
		const db = req.app.get('db')
		const id = +req.params.id

		db.getContent({id}).then(content => {
			res.status(200).send(content)
		})
	}
}