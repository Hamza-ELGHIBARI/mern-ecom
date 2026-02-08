const mongoose = require("mongoose");

const livreurSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vehicle: String,
    licenseNumber: String,
    plateNumber: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Livreur", livreurSchema);