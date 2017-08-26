const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const requireCredits = require('../middleware/requireCredits')

const Survey = mongoose.model('survey')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const surveyRoutes = (app) => {

  app.get('/surveys/thanks', (req, res) => res.send('Thank you. We appreciate your feedback!').status(200))

  // Create a new survey with the use of Mailer
  // class which extends Sendgrip provided methods and API.

  app.post('/surveys/new', requireLogin, requireCredits, async (req, res) => {
    const { user } = req
    const { title, subject, body, recipients } = req.body
    // Transform the string list of emails to an array of objects.
    const recipientsArrayOfObjects = recipients.split(',').map(email => ({ email: email.trim() }))
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipientsArrayOfObjects,
      _user: req.user.id,
      dateSent: Date.now(),
    })
    // Initialize survey details with survey template.
    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
      await mailer.send()
      await survey.save()
      user.credits -= 1
      const updatedUser = await user.save()
      res.send(updatedUser).status(200)
    } catch (err) {
      res.send(err).status(422)
    }
  })

  // ngrok used for webhook local tunnel.
  // In dev, start server and go to http://localhost:4040
  // to view ngrok provided tunnel.

  app.post('/surveys/webhooks', (req, res) => {
    console.log(req.body)
    res.send({})
  })
}

module.exports = surveyRoutes