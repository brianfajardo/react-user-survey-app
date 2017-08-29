const passport = require('passport')

// There exists an internal strategy which connects
// the first authenticate argument to the GoogleStrategy in services/passport.
// Scope specifies what access we want from users' Google account.

const authenticationRoutes = (app) => {

  app.get('/auth/current_user', (req, res) => res.send(req.user))

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/dashboard')
  })

  app.get('/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}

module.exports = authenticationRoutes