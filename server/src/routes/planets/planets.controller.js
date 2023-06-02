const {allPlanets}=require("../../models/planet.model")

async function getAllPlanets(req, res) {
    return res.status(200).json( await allPlanets())
}

module.exports={getAllPlanets}