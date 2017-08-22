const mongoose = require('mongoose')

const { Schema } = mongoose
const RecipientSchema = require('./Recipient')

const SurveyModel = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yesCount: {
    type: Number,
    default: 0,
  },
  noCount: {
    type: Number,
    default: 0,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dateSent: Date,
  latestResponse: Date,
})

const Survey = mongoose.model('survey', SurveyModel)

module.exports = Survey