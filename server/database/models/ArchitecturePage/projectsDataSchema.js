const mongoose = require("mongoose");

const ProjectData = new mongoose.Schema({
    imgId:String,
    imgURL:String,
    title:String,
    content:String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("ProjectData", ProjectData);