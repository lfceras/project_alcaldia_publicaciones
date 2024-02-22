const express = require('express')
const morgan = require('morgan')
const router = require('./routes')
const conectDb = require('./db.js')
const handlers = require('../utils/errors/handlers')

const app = express()

conectDb()

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(express.json())

app.use('/publications', router)

app.use('*', handlers.notFoundHandler)
app.use(handlers.errorHandler)

module.exports = app
