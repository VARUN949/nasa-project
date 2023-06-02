const express = require("express")
const cors=require("cors")
const planetsRouter = require("./routes/planets/planet.router")
const { lauchesRouter } = require("./routes/launches/launches.route")
const {api}=require('./routes/api')

const app = express()
// app.use(morgan("combined"))
app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.json());


app.use('/v1',api)
app.use('/planets',planetsRouter)
app.use('/launches',lauchesRouter)
module.exports=app