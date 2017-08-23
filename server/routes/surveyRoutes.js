const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const requireCredits = require('../middleware/requireCredits')

const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const surveyRoutes = (app) => {

  // Create a new survey with the use of Mailer
  // class which extends Sendgrip provided methods and API.

  app.post('/surveys/new', requireLogin, requireCredits, (req, res) => {
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

    // Initializing survey and emails to be sent out to end users.
    const mailer = new Mailer(survey, surveyTemplate(survey))
    mailer.send()
  })
}

module.exports = surveyRoutes