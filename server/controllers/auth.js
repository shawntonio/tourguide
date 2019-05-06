const bcrypt = require('bcryptjs');

module.exports = {
	async register(req, res) {
		const db = req.app.get('db')
		const {email, firstname, lastname, username, password} = req.body
		const {session} = req

		//check for duplicate accounts
		const emailTaken = await db.checkEmail({email})
		emailTaken = +emailTaken[0].count
		const usernameTaken = await db.checkUsername({username})
		usernameTaken = +usernameTaken[0].count
		if (emailTaken || usernameTaken) {
			return res.sendStatus(409)
		}

		//secure password
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)

		//add user
		const user_id = await db.registerUser({
			email,
			firstname,
			lastname,
			username,
			hash
		})

	}
}