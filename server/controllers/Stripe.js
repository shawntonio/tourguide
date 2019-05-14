require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SK);

module.exports = {
	async charge(req, res) {
		const {price, name} = req.body.tour
		const {token_id} = req.body
		try {
			const {status} = await stripe.charges.create({
				amount: price * 100,
				currency: 'usd',
				description: name,
				source: token_id
			})
			console.log(status)
			res.status(200).send(status)
		} catch (err) {
			res.status(500).end()
		}
	}
}