require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')

const authCtrl = require('./controllers/auth')
const toursCtrl = require('./controllers/ToursCtrl')
const AwsCtrl = require('./controllers/AwsCtrl')
const ContentCtrl = require('./controllers/ContentCtrl')
const StripeCtrl = require('./controllers/Stripe')
const GoogleCtrl = require('./controllers/GoogleCtrl')
const UserCtrl = require('./controllers/UserCtrl')

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

app.put('/user', UserCtrl.updateUser)
app.get('/user', UserCtrl.getUserInfo)

app.post('/api/tours', toursCtrl.createTour)
app.get('/api/tours/:id', toursCtrl.getMyTours)
app.get('/api/tours', toursCtrl.getLiveLocalTours)
app.get('/api/tour/:id', toursCtrl.getTourById)
app.put('/api/tour/:id', toursCtrl.updateTour)
app.delete('/api/tour/:id', toursCtrl.deleteTour)

app.post('/api/paid', toursCtrl.addPaidTour)
app.get('/api/paid', toursCtrl.getPaidTours)

app.get('/api/sig', AwsCtrl.getSig)

app.post('/api/content', ContentCtrl.createContent)
app.get('/api/content/:id', ContentCtrl.readContent)
app.delete('/api/content/:id', AwsCtrl.deleteObject)

app.post('/google/route', GoogleCtrl.getDirections)

app.post('/stripe/charge', StripeCtrl.charge)