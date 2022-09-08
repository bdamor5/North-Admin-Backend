const mongoose = require("mongoose");

const addAboveSectionSliderImages = new mongoose.Schema({
    sliderImages:[],
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("AboutPage-aboveSection", addAboveSectionSliderImages);