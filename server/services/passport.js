const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { googleClientID, googleClientSecret } = require('../config/googleOauthConfig')

// Google Strategy docs: https://github.com/jaredhanson/passport-google-oauth2

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Do something with MongoDB
}))