module.exports = {
	createTour(req, res) {
		const db = req.app.get('db')
		const {name, costs, price, type, time: duration, difficulty} = req.body
		const {lat, lng} = req.body.location
		const {login_id: user_id} = req.session.user

		db.createTour({user_id, name, costs, price, type, duration, difficulty, lat, lng})
		.then(() => res.sendStatus(200))
		.catch(err => res.status(500).send(err))
	},

	getMyTours(req, res) {
		if (!req.session.user) {
			return res.sendStatus(500)
		}
		const {login_id: user_id} = req.session.user
		const db = req.app.get('db')
		db.getMyTours({user_id}).then(tours => {
			res.status(200).send(tours)
		}).catch(err => res.status(500).send(err))
	},

	getTourById(req, res) {
		const db = req.app.get('db')
		const id = +req.params.id

		db.getTourById({id}).then(tour => {
			res.status(200).send(tour[0])
		})
	}
}