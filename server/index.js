const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

const router = require('./router')
const { mongoURI, cookieKey } = require('./configs/keys')
require('./models/User')
require('./services/passport')

// Heroku deployment checklist:
// 1. Environment variables set
// 2. Node and NPM version engines provided
// 3. Start script

mongoose.connect(mongoURI)

const app = express()
const PORT = process.env.PORT || '8000'

app.use(cookieSession({
  // 30 days converted to milliseconds
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [cookieKey],
}))

app.use(passport.initialize())
app.use(passport.session())

router(app)

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`))