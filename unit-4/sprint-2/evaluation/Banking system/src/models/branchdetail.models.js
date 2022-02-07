const mongoose = require("mongoose");
const branchdetailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    IFSC: { type: String, required: true },
    MICR: { type: String, required: true },
    createdAT: { type: String, required: true },
    updatedAT: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = mongoose.model("branchdetail", branchdetailSchema);
