const express = require("express");
const router = express.Router();

//controllers
const {
  addTestimonials,
  getAllTestimonials,
  DeleteTestimonial,
  changeSequenceTestimonials,
  
} = require("../controllers/dataControllers");

//home page testimonials
router.post("/homepage/testimonials/add/:adminId", addTestimonials);
router.get("/homepage/testimonials/all", getAllTestimonials);
router.delete("/homepage/testimonials/delete/:id", DeleteTestimonial);
router.put("/homepage/testimonials/change/sequence",changeSequenceTestimonials)

// router.get("/get/user/orders/:id", getUserOrders);

// router.put("/add/feedback/:orderNumber", addFeedbackForOrderNumber);

// router.put("/upload/file/:id", uploadFileURLs);

module.exports = router;
