const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  googleID: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
})

const User = mongoose.model('user', userSchema)

module.exports = User