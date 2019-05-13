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
	},

	updateTour(req, res) {
		const db = req.app.get('db')
		const id = +req.params.id
		const {type, duration, costs, price, difficulty} = req.body

		db.updateTour({type, duration, costs, price, difficulty, id})
		.then(() => res.sendStatus(200))
		.catch(err => console.log(err))
	},

	getLiveLocalTours(req, res) {
		const db = req.app.get('db')
		const {lat, lng} = req.query
		const latN = +lat - 1
		const latP = +lat + 1
		const lngN = +lng - 1
		const lngP = +lng + 1
		
		db.getLiveLocalTours({latN, latP, lngN, lngP}).then(tours => {
			res.status(200).send(tours)
		}).catch(err => console.log(err))
	},

	deleteTour(req, res) {
		const db = req.app.get('db')
		const {id} = req.params

		db.deleteTour({id})
		.then(() => res.sendStatus(200))
		.catch(err => console.log(err))
	}
}