const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  url: String,
  timeSpent: Number,
  category: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserData", UserDataSchema);
