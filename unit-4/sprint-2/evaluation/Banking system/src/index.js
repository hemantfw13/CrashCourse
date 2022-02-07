const express = require("express");
const app = express();
app.use(express.json());

const connect = require("./configs/connect");

const userController = require("./controllers/user.controller");
app.use("/users", userController);

const masteraccountController = require("./controllers/masterAccount.controller");
app.use("/masterAccount", masteraccountController);

app.listen(2345, async () => {
  try {
    await connect();
    console.log("listen port one");
  } catch (er) {
    console.error("Error :", +er);
  }
});
