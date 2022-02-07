const express = require("express");
const router = express.Router();
const BranchdetailSchema = require("../models/branchdetail.models");
//const user = require("../models/user.models");

router.post("/branch", async (req, res) => {
  const branch = await BranchdetailSchema.create(req.body);

  res.send(branch);
});

router.get("/branch", async (req, res) => {
  const branch = await BranchdetailSchema.find().lean().exec();
  res.send(branch);
});
module.exports = router;
