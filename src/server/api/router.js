const express = require('express')
const app = express()

const order = require('./orderApi')
const menu = require('./menuApi')

app.use('/api/order', order)
app.use('/api/menu', menu)

module.exports = app;