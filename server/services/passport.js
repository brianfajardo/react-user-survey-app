const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const { googleClientID, googleClientSecret } = require('../configs/devKeys')

// User model class reference

const User = mongoose.model('User')

// After fetching the user model instance from database
// (Mongo user ID), serialize user.id into a cookie.

passport.serializeUser((user, done) => done(null, user.id))

// Deserialize cookie, take id and return a user

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
})

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