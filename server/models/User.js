const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  googleID: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User