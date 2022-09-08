const mongoose = require("mongoose");

const TeamsData = new mongoose.Schema({
    imgId:String,
    imgURL:String,
    default:Boolean,
    category:String,
    name:String,
    job:String,
    location:String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("TeamsData", TeamsData);