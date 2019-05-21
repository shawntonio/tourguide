const bcrypt = require('bcryptjs');

module.exports = {
	async register(req, res) {
		const db = req.app.get('db')
		let {email, firstname, lastname, username, password} = req.body
		email = email.toLowerCase()
		username = username.toLowerCase()
		const {session} = req

		//check for duplicate accounts
		let emailTaken = await db.checkEmail({email})
		emailTaken = +emailTaken[0].count
		let usernameTaken = await db.checkUsername({username})
		usernameTaken = +usernameTaken[0].count
		if (emailTaken || usernameTaken) {
			return res.status(409).send('email or username is taken. Please log in if you have an account.')
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

		//login
		session.user = {
			username,
			login_id: user_id[0].id
		}

		res.status(200).send(session.user)
	},

	async login(req, res){
		const db = req.app.get('db')
		const {username, password} = req.body

		const foundUser = await db.getUser({username})
		const user = foundUser[0]

		if (!user) {
			return res.status(401).send('User not found. Register as a new user first')
		}

		const isAuthenticated = bcrypt.compareSync(password, user.hash)

		if (!isAuthenticated) {
			return res.status(403).send('Incorrect username or password')
		}

		req.session.user = {
			username,
			login_id: user.id
		}

		res.status(200).send(req.session.user)
	},
	
	logout(req, res) {
		req.session.destroy()
		res.sendStatus(200)
	},

	getUser(req, res) {
		if (req.session.user) {
			return res.status(200).send(req.session.user)
		}
		res.send()
	}
}