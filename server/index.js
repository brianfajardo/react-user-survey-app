const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')

require('./models/User')
require('./models/Survey')
require('./services/passport')
const { mongoURI, cookieKey } = require('./configs/keys')
const authenticationRoutes = require('./routes/authenticationRoutes')
const billingRoutes = require('./routes/billingRoutes')
const surveyRoutes = require('./routes/surveyRoutes')

// Heroku deployment checklist:
// 1. Environment variables set
// 2. Node and NPM version engines provided
// 3. Start script

mongoose.connect(mongoURI)
mongoose.Promise = global.Promise

const app = express()
const PORT = process.env.PORT || '8000'

// Middleware

app.use(bodyParser.json())
app.use(cookieSession({
  // 30 days converted to milliseconds
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [cookieKey],
}))
app.use(passport.initialize())
app.use(passport.session())

authenticationRoutes(app)
billingRoutes(app)
surveyRoutes(app)

// In production, if a request does not match in any of the above
// routes, attempt to find routes in main.js that contains the
// React-Router routes. If route is still not found, Express
// will return index.html back to the client.

if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static(path.resolve(__dirname, '../client/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html')))
}

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`))