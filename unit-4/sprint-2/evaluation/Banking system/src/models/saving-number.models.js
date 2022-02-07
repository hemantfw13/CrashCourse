const mongoose = require("mongoose");
const savingaccoutSchema = new mongoose.Schema(
  {
    account_number: { type: Number, required: true },
    balance: { type: Number, required: true },
    createdAT: { type: String, required: true },
    updatedAT: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = mongoose.model("savingAccount", savingaccoutSchema);
