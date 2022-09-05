const mongoose = require("mongoose");

const testimonialsSchema = new mongoose.Schema({
    category:String,
    name:String,
    content:String,
    author:String,
    addedByAdminId:String,
    addedByAdminEmail:String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("Testimonial", testimonialsSchema);
