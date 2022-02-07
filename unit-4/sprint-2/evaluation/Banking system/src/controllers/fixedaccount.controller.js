const express = require("express");
const router = express.Router();
const fixedaccountSchema = require("../models/fixedaccount.models");
//const user = require("../models/user.models");

router.post("/fixed", async (req, res) => {
  const fixed = await fixedaccountSchema.create(req.body);

  res.send(fixed);
});

router.get("/fixed", async (req, res) => {
  const fixed = await fixedaccountSchema.find().lean().exec();
  res.send(fixed);
});
module.exports = router;
