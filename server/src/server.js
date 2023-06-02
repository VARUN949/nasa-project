const http = require('http')
const app = require('./app')
const {loadPlanets} = require("./models/planet.model")
const mongoose=require('mongoose')

const PORT = process.env.PORT || 8000;
const server = http.createServer(app)
monodb_url = "mongodb+srv://varun:varun@cluster0.qedsvam.mongodb.net/nasa?retryWrites=true&w=majority"


mongoose.connection.once("open", () => {
    console.log("database is connected")
})
mongoose.connection.on("error", (err) => {
    console.error(`error generated ${err}`)
})

async function startServer() {
    await mongoose.connect(monodb_url)
    await loadPlanets()
    server.listen(PORT, () => {
        console.log(`server listening at port ${PORT}`)
    })
    
}
startServer()



