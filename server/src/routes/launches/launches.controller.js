const {
  lauches,
  addNewLaunch,
  abortLaunchById,
  notExistLaunch,
} = require("../../models/launch.model");

async function getAllLauches(req, res) {
  console.log(lauches());
  return res.status(200).json(await lauches());
}

async function httpAddNewLaunch(req, res) {
  console.log("running");
  try {
    const launch = req.body;
    if (
      !launch.mission ||
      !launch.rocket ||
      !launch.launchDate ||
      !launch.target
    ) {
      return res.status(400).json({
        error: "missing data",
      });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
      return res.status(400).json({
        error: "invalid date",
      });
    }
    await addNewLaunch(launch);
    return res.status(201).json(launch);
  } catch (err) {
    console.log(`${req.url}    ${err}`);
  }
}

async function httpDeleteLaunch(req, res) {
  let ID = Number(req.params.id);
  console.log(await notExistLaunch(ID));
  if (!(await notExistLaunch(ID))) {
    return res.status(404).json({
      error: "data not found",
    });
  }
  const aborted = await abortLaunchById(ID);
  // return res.status(200).json(ID)
  if (!aborted) {
    return res.status(404).json({
      error: "data not aborte",
    });
  } else {
    return res.status(404).json({
      ok: true,
    });
  }
}

module.exports = { getAllLauches, httpAddNewLaunch, httpDeleteLaunch };
