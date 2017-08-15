const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { googleClientID, googleClientSecret } = require('./config/googleOauthConfig')

// Heroku deployment checklist:
// 1. Environment variables set
// 2. Node and NPM version provided in package.json as engines
// 3. Start script in package.json

const app = express()
const PORT = process.env.PORT || '8000'

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback',
}, accessToken => console.log(accessToken)))

// There exists an internal strategy which connects
// the first authenticate argument to the GoogleStrategy above.
// Scope specifies what access we want from users' Google account.

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

app.get('/auth/google/callback',
  passport.authenticate('google'),
)

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`))