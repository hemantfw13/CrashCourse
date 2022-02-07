const express = require("express");
const connect = require("./configs/db");
const app = express();
app.listen(2345, function () {
  try {
    await connect();
  } catch (e) {
    console.error("error is ", e.message);
  }
  console.log("listen port one");
});
