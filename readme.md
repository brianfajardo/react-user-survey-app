# Fullstack Javascript Survey 🌀

This application requires users to login through their Google account. After successful OAuth authentication, users can purchase credits to use towards creating their own surveys. Surveys are sent out to email recipients and user response is rendered into the Dashboard component for visual feedback.

### 🏎 Heroku demo: https://sleepy-lake-11241.herokuapp.com

### ✅ Instructions:
1. Login with a Google account
2. Stripe payments are in TEST mode for demo purposes:
* Provide a random email
* Credit card number: 4242 4242 4242 4242 (test credit card)
* Select a future expiration date and 3 digit security code
3. Create a survey!

In the back end, Node.js and Express served as the server to route and handle incoming HTTP requests. The OAuth authentication flow was handled with Passport using the Google Strategy. MongoDB (mLab service) was used as the database to persist data including authenticated, registered users, delivered surveys and email recipient statuses. Object relational mapper, Mongoose was used in tangent with Node to make touches to the database easier.

React and Redux (❤️) were used to power this single page application. Containers were built to take in application state from Redux and props were trickled down to stateless components. Related React libraries used in this project:
* React Router to navigate between paths and components
* Redux Form to handle survey creation
* Redux Thunk to dispatch actions

Payments for survey credits are handled in the StripePayment component. To keep user payment information secure and private, payment request is sent off to be handled by Stripe. Token received as a callback is then forwarded to the server where transaction is confirmed and credits added to the user.

Sendgrid was used to send email templated surveys to the recipient list. Webhook feature of Sendgrid is supported to update Redux state about user feedback to be shown in the Dashboard component.