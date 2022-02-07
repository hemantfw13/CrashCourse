const express = require("express");
const router = express.Router();
const user = require("../models/user.models");
//const user = require("../models/user.models");
router.get("", async (req, res) => {
  try {
    const item = await user.find().lean().exec();
    res.send(item);
  } catch (er) {
    console.log("Error:" + er);
    res.status(500).send("Error:" + er);
  }
});
router.post("", async (req, res) => {
  try {
    const item = await user.find().create(req.body);
    console.log(req.body.type);
    res.status(201).send(item);
  } catch (er) {
    console.log("Error:" + er);
    res.status(500).send("Error:" + er);
  }
});
module.exports = router;
