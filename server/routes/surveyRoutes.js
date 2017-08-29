const mongoose = require('mongoose')
const _ = require('lodash')
const Path = require('path-parser')
const { URL } = require('url')

const Survey = mongoose.model('survey')
const requireLogin = require('../middleware/requireLogin')
const requireCredits = require('../middleware/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const surveyRoutes = (app) => {

  app.get('/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false })

    if (!surveys) { res.send({ message: 'User has not created any surveys!' }) }

    res.send(surveys).status(200)
  })

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
      dateSent: Date.now()
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
  // to view ngrok provided URL tunnel.

  app.post('/surveys/webhooks', (req) => {

    // Initial req.body processing.
    // Purpose: Take the event URL and extract the surveyId and choice properties.
    // New parser object, delegate URL params.
    // Allocates parsed URL properties to above instructions.
    // If surveyId or selected URL params are not provided,
    // p.test(pathname) returns null. Falsey matches will be discarded.

    _.chain(req.body)
      .map(({ url, email }) => {
        const pathName = new URL(url).pathname
        const p = new Path('/surveys/:surveyId/:choice')
        const match = p.test(pathName)

        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice }
        }

        return null
      })
      .compact() // Returns only event objects, removes undefined.
      .uniqBy('email', 'surveyId') // Removes email and surveyId duplicates.
      .each(({ surveyId, email, choice }) =>
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          // '$' matches the exact recipient found in the original $elemMatch query.
          $set: { 'recipients.$.responded': true },
          latestResponse: new Date()
        }).exec()) // execute query
      .value()
  })

  app.get('/surveys/:surveyId/:choice', (req, res) => res.send('Thanks for voting! We appreciate your feedback 🎉').status(200))
}

module.exports = surveyRoutes