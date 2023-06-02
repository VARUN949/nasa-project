const parse = require("csv-parse");
const fs = require("fs");
const planet = require("./planet.mongo");


const _list = [];

function ishabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanets() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("./data/kepler_data.csv")
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (ishabitable(data)) {
         await SavePlanet(data)
        }
      })
      .on("end", async () => {
        const countPlanets = (await allPlanets()).length
        console.log(`number of plannte${countPlanets}`);
        resolve();
      })
      .on("error", (err) => {
        console.log(err);
        reject();
      });
  });
}

async function allPlanets() {
  return await planet.find({});
  //  return _list;
}

async function SavePlanet(data) {
  try {
    await planet.updateOne(
      { kepler_name: data.kepler_name },
      {
        kepler_name: data.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { allPlanets, loadPlanets };
