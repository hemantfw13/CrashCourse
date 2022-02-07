const express = require("express");
const router = express.Router();
const userSchema = require("../models/user.models");
//const user = require("../models/user.models");

router.post("/user", async (req, res) => {
  const user = await userSchema.create(req.body);

  res.send(user);
});

router.get("/user", async (req, res) => {
  const user = await userSchema.find().lean().exec();
  res.send(user);
});
module.exports = router;
