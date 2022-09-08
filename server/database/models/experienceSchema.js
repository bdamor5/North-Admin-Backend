const mongoose = require("mongoose");

const Experience = new mongoose.Schema({
    name:String,
    content:String,
    designation:String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("Experience", Experience);