const { stripeSecretKey } = require('../configs/keys')
const stripe = require('stripe')(stripeSecretKey)
const requireLogin = require('../middleware/requireLogin')

const billingRoutes = (app) => {

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

module.exports = billingRoutes