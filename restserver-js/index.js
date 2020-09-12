'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const routes = require('./routes')
const port = parseInt(process.env.PORT || 3001)
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ strict: true }))
// routes
app.use(routes)
// 404 error handler
app.use((req, res, next) => {
  next(new createError.NotFound())
})
// error middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500)
    .json({ message: err.message || 'Internal Server Error' })
})
app.listen(port, '0.0.0.0', () => {
  console.log(`HTTP server started listening at http://localhost:${port}`)
})