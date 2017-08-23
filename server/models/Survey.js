const mongoose = require('mongoose')

const { Schema } = mongoose
const recipientSchema = require('./Recipient')

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [recipientSchema],
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
    ref: 'user',
  },
  dateSent: Date,
  latestResponse: Date,
})

const Survey = mongoose.model('survey', surveySchema)

module.exports = Survey