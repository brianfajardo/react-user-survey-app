const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const { googleClientID, googleClientSecret } = require('../configs/googleOauthConfig')

// Fetching the model class from mongoose by
// providing only one argument to model method.

const User = mongoose.model('User')

// Google Strategy docs: https://github.com/jaredhanson/passport-google-oauth2

passport.use(new GoogleStrategy(
  {
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          User
            .create({ googleID: profile.id })
            .then(newUser => done(null, newUser))
        }
      })
  },
))