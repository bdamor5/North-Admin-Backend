const mongoose = require("mongoose");

const testimonialsSchema = new mongoose.Schema({
    category:String,
    name:String,
    content:String,
    designation:String,
    addedByAdminId:String,
    addedByAdminEmail:String,
    SequenceNo:{
      type:Number,
      default:0
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("Testimonial", testimonialsSchema);
