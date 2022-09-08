const mongoose = require("mongoose");

const WorkShop = new mongoose.Schema({
    imgId:String,
    imgURL:String,
    course:String,
    title:String,
    data:String,
    days:String,
    dateYear:String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("WorkShop", WorkShop);