const passport = require('passport')
const { stripeSecretKey } = require('../configs/keys')
const stripe = require('stripe')(stripeSecretKey)

const requireLogin = require('../middleware/requireLogin')

// There exists an internal strategy which connects
// the first authenticate argument to the GoogleStrategy in services/passport.
// Scope specifies what access we want from users' Google account.

const router = (app) => {

  // Authentication
  app.get('/auth/current_user', (req, res) => res.send(req.user))

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/surveys')
  })

  app.get('/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  // Payments and billings
  app.post('/payments/stripe', requireLogin, async (req, res) => {

    // Stripe charge
    const { user } = req
    const token = req.body.id
    await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 charge for 5 survey credits',
      source: token,
    })

    // Adding paid credits to the user's instance.
    user.credits += 5
    const updatedUser = await user.save()
    res.send(updatedUser).status(200)
  })
}

module.exports = router