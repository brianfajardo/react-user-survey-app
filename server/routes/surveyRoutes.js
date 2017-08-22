const surveyRoutes = (app) => {

  // return list of surveys created by current user
  app.get('/surveys')

  // new survey
  app.post('/surveys/create')

  // record feedback from a user who clicked the email
  app.post('/surveys/webhooks')
}

module.exports = surveyRoutes