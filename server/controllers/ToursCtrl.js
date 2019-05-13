module.exports = {
	createTour(req, res) {
		const db = req.app.get('db')
		const {name, location} = req.body
		const {lat, lng} = location
		const {login_id: user_id} = req.session.user

		db.createTour({user_id, name, lat, lng})
		.then(() => res.sendStatus(200))
		.catch(err => res.status(500).send(err))
	},

	getMyTours(req, res) {
		const {id: user_id} = req.params
		
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