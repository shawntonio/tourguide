require('dotenv').config()
const axios = require('axios')
const {REACT_APP_GOOGLE_KEY} = process.env

module.exports = {
	getDirections(req, res) {
		const {content} = req.body
		const origin = `${content[0].lat},${content[0].lng}`
		const last = content[content.length - 1]
		const destination = `${last.lat},${last.lng}`

		axios.get(`https://maps.googleapis.com/maps/api/directions/json?key=${REACT_APP_GOOGLE_KEY}&origin=${origin}&destination=${destination}`).then(directions => {
			res.status(200).send(directions.data)
		}).catch(err => console.log(err))
	}
}