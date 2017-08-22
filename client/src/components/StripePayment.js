import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import PropTypes from 'prop-types'

// Test mode Stripe provided Visa #: 4242 4242 4242 4242
// token prop represents the callback function after Swipe processes the payment.
// In production, REACT_APP_STRIPE_PUBLISHABLE_KEY set in Heroku env variables.

const StripePayment = ({ handleStripeToken }) => (
  <StripeCheckout
    name="React Survey Feedback ✅"
    description="Create new surveys with credits"
    currency="USD"
    amount={500}
    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    token={token => handleStripeToken(token)}
    ComponentClass="a"
  >
    Buy Credits
  </StripeCheckout>
)

StripePayment.propTypes = {
  handleStripeToken: PropTypes.func.isRequired
}

export default StripePayment