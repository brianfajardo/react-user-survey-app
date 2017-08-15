const express = require('express')
const mongoose = require('mongoose')
const { mongoURI } = require('./configs/mLabConfig')
const router = require('./router')
require('./models/User')
require('./services/passport')

// Heroku deployment checklist:
// 1. Environment variables set
// 2. Node and NPM version provided in package.json as engines
// 3. Start script in package.json

mongoose.connect(mongoURI)

const app = express()
const PORT = process.env.PORT || '8000'

router(app)

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`))