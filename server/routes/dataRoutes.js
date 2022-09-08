const express = require("express");
const router = express.Router();

//controllers
const {
  addTestimonials,
  getAllTestimonials,
  DeleteTestimonial,
  addTeamsData,
  getAllTeamsData,
  DeleteTeamsData,
  addSliderImages,
  getAllSliderImages,
  DeleteSliderImages,
  
} = require("../controllers/dataControllers");

//home page testimonials
router.post("/homepage/testimonials/add/:adminId", addTestimonials);
router.get("/homepage/testimonials/all", getAllTestimonials);
router.delete("/homepage/testimonials/delete/:id", DeleteTestimonial);
// router.put("/homepage/testimonials/change/sequence",changeSequenceTestimonials)

//slider images
router.post("/sliderImages/add/:adminId", addSliderImages);
router.get("/sliderImages/get/:pageSection", getAllSliderImages);
router.delete("/sliderImages/delete/:id", DeleteSliderImages);

//teams data
router.post("/aboutpage/teamsdata/add/:adminId", addTeamsData);
router.get("/aboutpage/teamsdata/all", getAllTeamsData);
router.delete("/aboutpage/teamsdata/delete/:id", DeleteTeamsData);

// router.put("/add/feedback/:orderNumber", addFeedbackForOrderNumber);

// router.put("/upload/file/:id", uploadFileURLs);

module.exports = router;
