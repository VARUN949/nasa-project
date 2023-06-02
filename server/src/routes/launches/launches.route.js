const express = require("express")
const { getAllLauches,httpAddNewLaunch,httpDeleteLaunch } = require("./launches.controller")
const lauchesRouter = express.Router()

lauchesRouter.get('/', getAllLauches)
lauchesRouter.post('/',httpAddNewLaunch)
lauchesRouter.delete('/:id',httpDeleteLaunch)

module.exports={lauchesRouter}