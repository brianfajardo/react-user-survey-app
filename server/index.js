const express = require('express')

// Heroku deployment checklist:
// 1. Environment variables set
// 2. Node and NPM version provided in package.json as engines
// 3. Start script in package.json

const app = express()
const PORT = process.env.PORT || '8000'

app.get('/dev', (req, res) => res.send({ message: 'Greetings developer!⚡️' }))

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`))