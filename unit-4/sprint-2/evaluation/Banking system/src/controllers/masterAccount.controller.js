const express = require("express");
const router = express.Router();
const masteraccountSchema = require("../models/masterAccount.models");
//const user = require("../models/user.models");

router.post("/master", async (req, res) => {
  const master = await masteraccountSchema.create(req.body);

  res.send(master);
});

router.get("/master", async (req, res) => {
  const master = await masteraccountSchema
    .find()
    .populate("user_id")
    .populate("savingact_id")
    .populate("fixedact_id")
    .lean()
    .exec();
  res.send(master);
});
module.exports = router;
