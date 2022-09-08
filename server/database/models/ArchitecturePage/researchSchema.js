const mongoose = require("mongoose");

const Research = new mongoose.Schema({
    sliderImages:[],
    title:String,
    content:String,
    links:String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("Research", Research);