const mongoose = require("mongoose");

const SliderImages = new mongoose.Schema({
    sliderImages:[],
    pageSection:String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("SliderImages", SliderImages);