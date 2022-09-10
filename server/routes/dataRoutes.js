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
  addResearch,
  getAllResearch,
  DeleteResearch,
  addproject,
  getAllproject,
  Deleteproject,
  addStayProperty,
  getAllstayProperty,
  DeletestayProperty,
  addExperience,
  getAllExperience,
  DeleteExperience,
  addWorkshop,
  getAllWorkshop,
  DeleteWorkshop,
  addLibrary,
  getAllLibrary,
  DeleteLibrary,
  addPress,
  getAllPress,
  DeletePress,
  
} = require("../controllers/dataControllers");

//home page testimonials
router.post("/homepage/testimonials/add/:adminId", addTestimonials);
router.get("/homepage/testimonials/all", getAllTestimonials);
router.delete("/homepage/testimonials/delete/:id", DeleteTestimonial);

//slider images
router.post("/sliderImages/add/:adminId", addSliderImages);
router.get("/sliderImages/get/:pageSection", getAllSliderImages);
router.delete("/sliderImages/delete/:id", DeleteSliderImages);

//about page - teams data
router.post("/aboutpage/teamsdata/add/:adminId", addTeamsData);
router.get("/aboutpage/teamsdata/all", getAllTeamsData);
router.delete("/aboutpage/teamsdata/delete/:id", DeleteTeamsData);

//architecture page - research data
router.post("/research/add/:adminId", addResearch);
router.get("/research/all", getAllResearch);
router.delete("/research/delete/:id", DeleteResearch);

//architecture page - project data
router.post("/project/add/:adminId", addproject);
router.get("/project/all", getAllproject);
router.delete("/project/delete/:id", Deleteproject);

//stay/property page & workshop testimonial
router.post("/stay/property/add/:adminId/:pageSection", addStayProperty);
router.get("/stay/property/all/:pageSection", getAllstayProperty);
router.delete("/stay/property/delete/:id", DeletestayProperty);

//experience page
router.post("/experience/add/:adminId", addExperience);
router.get("/experience/all", getAllExperience);
router.delete("/experience/delete/:id", DeleteExperience);

//workshop page
router.post("/workshop/add/:adminId", addWorkshop);
router.get("/workshop/all", getAllWorkshop);
router.delete("/workshop/delete/:id", DeleteWorkshop);

//library page
router.post("/library/add/:adminId", addLibrary);
router.get("/library/all", getAllLibrary);
router.delete("/library/delete/:id", DeleteLibrary);

//press page
router.post("/press/add/:adminId", addPress);
router.get("/press/all", getAllPress);
router.delete("/press/delete/:id", DeletePress);

module.exports = router;
