const mongoose = require("mongoose");
const MasteraccoutSchema = new mongoose.Schema(
  {
    balance: { type: Number, required: true },

    createdAT: { type: String, required: true },
    updatedAT: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = mongoose.model("masterAccount", MasteraccoutSchema);
