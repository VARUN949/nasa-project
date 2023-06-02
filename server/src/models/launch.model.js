const launchesDatabase=require('./launch.mongo')
const planets = require('./planet.mongo')
const axios = require('axios');


// const launchesMap= new Map()
let latestFlighNumber = getlatestFlighNumber();
const launch = {
    flightNumber: 100,
    mission: "kepler exploration",
    rocket: "Explorer ISI",
    launchDate: new Date('December 22, 2030'),
    target: "Kepler-442 b",
    customer: ['ZTM', 'nasa'],
    upcoming: true,
    success:true,
}
// launchesMap.set(launch.flightNumber, launch)


async function notExistLaunch(ID) {
    return await launchesDatabase.findOne({
        flightNumber:ID
    })
}

async function getlatestFlighNumber(){
    const latestFlighNumber = await launchesDatabase.findOne().sort("-flightNumber")

    if (!latestFlighNumber) {
        return 100;
    }
    return latestFlighNumber.flightNumber

}

async function saveLaunches(launch) {
    const planet=await planets.findOne({kepler_name:launch.target})
    // console.log(launch)
    if (!planet) {
        throw new Error("No matching planet found")
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber:launch.flightNumber
    }, launch, {
        upsert:true
    })
}

async function lauches() {
    return await launchesDatabase.find({},{"_id":0,"__v":0})
}


async function addNewLaunch(launch) {
    const latestFlighNumber= await getlatestFlighNumber()+1
    const newLaunch = Object.assign(launch, {
        flightNumber: latestFlighNumber,
        customer: ['ZTM', 'nasa'],
        upcoming: true,
        success: true, 
    })
    console.log(newLaunch)
    await saveLaunches(newLaunch)
}

// function addNewLaunch(lauch) {
//     latestFlighNumber++;
//     launchesMap.set(latestFlighNumber, Object.assign(lauch, {
//         flightNumber: latestFlighNumber,
//         customer: ['ZTM', 'nasa'],
//         upcoming: true,
//         success:true, 
//     }))
// }
async function abortLaunchById(id) {

    const aborted = await launchesDatabase.updateOne({
        flightNumber:id
    }, {
        upcoming: false,
        success:false,
    })
    
    return aborted.modifiedCount
}

const SPACE_X_UPI="https://api.spacexdata.com/v4/launches/query"



module.exports = {
    lauches,
    addNewLaunch,
    notExistLaunch,
    abortLaunchById
}