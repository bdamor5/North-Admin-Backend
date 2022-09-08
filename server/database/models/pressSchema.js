const mongoose = require("mongoose");

const PressPage = new mongoose.Schema({
    imgId:String,
    imgURL:String,
    videoLink:Boolean,
    title:String,
    content:String,
    date:String,
    name:String,
    newlink:String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("PressPage", PressPage);