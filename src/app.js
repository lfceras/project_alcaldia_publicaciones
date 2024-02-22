const express = require('express')
const morgan = require('morgan')
const router = require('./routes')
const conectDb = require('./db.js')
const handlers = require('../utils/errors/handlers')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

conectDb()

app.disable('x-powered-by')
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true
}))

app.use(cookieParser())
app.use(morgan('dev'))
app.use('/publications', router)

app.use('*', handlers.notFoundHandler)
app.use(handlers.errorHandler)

module.exports = app
