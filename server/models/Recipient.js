const mongoose = require('mongoose')

const { Schema } = mongoose

const RecipientSchema = new Schema({
  email: String,
  responded: Boolean,
})

module.exports = RecipientSchema