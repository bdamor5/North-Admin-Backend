const mongoose = require("mongoose");

const Library = new mongoose.Schema({
    imgId:String,
    imgURL:String,
    title:String,
    author:String,
    dateYear:String,
    hasPdf:Boolean,
    pdfFileURL:String,
    link:String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("Library", Library);