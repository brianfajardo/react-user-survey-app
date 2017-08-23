const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const { googleClientID, googleClientSecret } = require('../configs/keys')

// User model class reference

const User = mongoose.model('user')

// After fetching the user model instance from database
// (Mongo user ID), serialize user.id into a cookie.

passport.serializeUser((user, done) => done(null, user.id))

// Deserialize cookie, take id and return a user

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

// Google Strategy docs: https://github.com/jaredhanson/passport-google-oauth2

passport.use(new GoogleStrategy(
  {
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id })
    if (existingUser) { return done(null, existingUser) }
    const newUser = await User.create({ googleID: profile.id })
    return done(null, newUser)
  },
))