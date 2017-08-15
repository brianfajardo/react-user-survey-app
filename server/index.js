const express = require('express')
require('./services/passport')
const router = require('./router')

// Heroku deployment checklist:
// 1. Environment variables set
// 2. Node and NPM version provided in package.json as engines
// 3. Start script in package.json

const app = express()
const PORT = process.env.PORT || '8000'

router(app)

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`))