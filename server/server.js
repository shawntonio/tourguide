require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')

const authCtrl = require('./controllers/auth')
const toursCtrl = require('./controllers/ToursCtrl')
const AwsCtrl = require('./controllers/AwsCtrl')
const ContentCtrl = require('./controllers/ContentCtrl')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}))

massive(CONNECTION_STRING).then(db => {
	app.set('db', db)
	app.listen(SERVER_PORT, console.log('listening on', SERVER_PORT))
})

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/user', authCtrl.getUser)
app.get('/auth/logout', authCtrl.logout)

app.post('/api/tours', toursCtrl.createTour)
app.get('/api/tours/user', toursCtrl.getMyTours)

app.get('/api/sig', AwsCtrl.getSig)

app.post('/api/content', ContentCtrl.createContent)