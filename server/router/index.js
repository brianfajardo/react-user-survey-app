const passport = require('passport')

// There exists an internal strategy which connects
// the first authenticate argument to the GoogleStrategy in services/passport.
// Scope specifies what access we want from users' Google account.

const router = (app) => {

  // Authentication
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
  app.get('/auth/google/callback', passport.authenticate('google'))
  app.get('/api/logout', req => req.logout())

  // Test OAuth current user.
  app.get('/api/current_user', (req, res) => res.send(req.user))
}

module.exports = router