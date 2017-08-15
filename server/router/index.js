const passport = require('passport')

// There exists an internal strategy which connects
// the first authenticate argument to the GoogleStrategy in services/passport.
// Scope specifies what access we want from users' Google account.

const router = (app) => {
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
  app.get('/auth/google/callback', passport.authenticate('google'))
}

module.exports = router