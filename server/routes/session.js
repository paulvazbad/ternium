
const _ = require("lodash");
const { ActiveSession } = require("../models/session");
const express = require("express");
const router = express.Router();

/* 
 /api/sessions

*/
router.post("/:deviceID", async (req, res) => {
  /*
    deviceID:"string",
    gasses:[]
    */
  console.log("Esto es lo que me llego: " + req.body);
  let session = await ActiveSession.findOne({ deviceID: req.body.deviceID });
  if (!session) {
    console.log("Not found previously");
    //new db entry
  } else {
    console.log("Found entry" + session);
    //update entry
  }
  /* 
    Example:
  {
  
        deviceID:String,
        gasses:{
            oxigeno:3243,
            temperatura:213213,
            CO: 2133221,

        }

  }
  
  */
  session = new ActiveSession(_.pick(req.body, ["deviceID", "gasses"]));
  await session.save();
  console.log("Saved session" + session);
});

router.get("/", async (req, res) => {
  let sessions = await ActiveSession.find({});
  console.log("Query results: " + sessions);
  res.send(sessions);
});

module.exports = router;
