const express = require("express");
const router = express.Router();
const savingaccountSchema = require("../models/saving-number.models");
//const user = require("../models/user.models");

router.post("/saving", async (req, res) => {
  const saving = await savingaccountSchema.create(req.body);

  res.send(saving);
});

router.get("/saving", async (req, res) => {
  const saving = await savingaccountSchema.find().lean().exec();
  res.send(saving);
});
module.exports = router;
