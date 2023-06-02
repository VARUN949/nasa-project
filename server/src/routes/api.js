const express = require('express')
const planetsRouter = require("./planets/planet.router")
const { lauchesRouter } = require("./launches/launches.route")


const api = express.Router()

api.use('/planets',planetsRouter)
api.use('/launches',lauchesRouter)

module.exports={api}