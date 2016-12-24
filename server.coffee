'use strict'

coffee = require 'coffee-script/register'
coffee = require 'coffee-script/register'
express = require 'express'
bodyParser = require 'body-parser'
mongoose = require 'mongoose'
expressValidator = require 'express-validator'
config = require './config'
path = require 'path'
cors = require 'cors'
response = require './services/response'
chat = require './services/websocket'

app = express()
app.set 'port', config.port
app.set 'host', config.host

mongoose.connect config.database, (err) ->
  console.log('Connecting mongodb on:' + config.database)
  console.log('Error to connect mongodb on (' + config.database + '): ' + err) if err

app.use bodyParser.json()
app.use bodyParser.urlencoded({ extended: true })

corsOptions = {'origin': true, 'allowedHeaders': "Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept, x-access-token", "methods": "GET,PUT,POST,DELETE,OPTIONS", 'credentials': true}
app.use cors(corsOptions)
app.options '*', cors(corsOptions)

app.use expressValidator()

app.use (req, res, next) ->
  res.type = response.messages
  res.with = response.with
  next()
  return

app.use '/api', require './routes'

app.listen app.get('port'), () ->
  console.log('App listening on ' + app.get('host') + ':' + app.get('port'))