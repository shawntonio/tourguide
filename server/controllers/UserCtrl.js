module.exports = {
	updateUser(req, res) {
		const db = req.app.get('db')
		const {login_id: id} = req.session.user
		const {firstname, lastname, email, profile_pic} = req.body
		db.updateUser({firstname, lastname, email, profile_pic, id})
		.then(() => res.sendStatus(200))
		.catch(err => console.log(err))
	},

	getUserInfo(req, res) {
		const db = req.app.get('db')
		const {id} = req.query

		db.getUserInfo({id}).then(user => res.status(200).send(user[0]))
		.catch(err => console.log(err))
	},

	getUsernameByTour (req, res) {
		const db = req.app.get('db')
		const {id} = req.params
		
		db.getUsernameByTour({id}).then(username => {
			res.status(200).send(username[0])
		}).catch(err => console.log(err))
	}
}