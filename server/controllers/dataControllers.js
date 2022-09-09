const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

//models
const User = require("../database/models/userSchema");
const Testimonial = require("../database/models/testimonialsSchema");
const sliderImage = require("../database/models/sliderImagesSchema")
const teamsData = require("../database/models/teamsDataSchema")
const Research = require("../database/models/ArchitecturePage/researchSchema")
const Project = require("../database/models/ArchitecturePage/projectsDataSchema")
const StayProperty = require("../database/models/StayPropertySchema")
const Experience = require("../database/models/experienceSchema")
const Workshop = require("../database/models/workshopSchema")
const Library = require("../database/models/librarySchema")
const Press = require("../database/models/pressSchema")

//-----------------------------------Home page------------------------------------------------------------------

//add testimonials
exports.addTestimonials = asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new Testimonial({
    ...req.body.category,
    addedByAdminId: req.params.adminId,
    addedByAdminEmail: user[0].email,
  });

  await data.save();

  res.status(201).json({ success: true, data });
});

//get all testimonials
exports.getAllTestimonials = asyncErrorHandler(async (req, res, next) => {
  const data = await Testimonial.find();

  res.status(200).json({ success: true, data });
});

//delete a testimonial
exports.DeleteTestimonial = asyncErrorHandler(async (req, res, next) => {
  const data = await Testimonial.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "No item found" });
  }
});

//editing sequence of  testimonials
// exports.changeSequenceTestimonials = asyncErrorHandler(
//   async (req, res, next) => {
//     const DBdata = await Testimonial.find();
//     const reqData = req.body;

//     DBdata.map((db) => {
//       reqData.map(async (curr) => {
//         if (String(db._id) === curr.id) {
//           db.SequenceNo = curr.SequenceNo;
//           await db.save();
//         }
//       });
//     });

//     res.status(200).json({ success: true, DBdata });
//   }
// );


//post slider images
exports.addSliderImages = asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new sliderImage({
    sliderImages : req.body.images.sliderImages,
    pageSection : req.body.images.pageSection
  });

  await data.save();

  res.status(201).json({ success: true, data });
});

//get all slider images
exports.getAllSliderImages = asyncErrorHandler(async (req, res, next) => {
  const data = await sliderImage.find({pageSection:req.params.pageSection});

  res.status(200).json({ success: true, data });
});

//delete slider images
exports.DeleteSliderImages = asyncErrorHandler(async (req, res, next) => {
  const data = await sliderImage.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "No item found" });
  }
});

//-----------------------------------About page------------------------------------------------------------------
//post teams data 
exports.addTeamsData = asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new teamsData({
    ...req.body.teamsData,
  });

  await data.save();

  res.status(201).json({ success: true, data });
});

//get all teams data
exports.getAllTeamsData = asyncErrorHandler(async (req, res, next) => {
  const data = await teamsData.find();

  res.status(200).json({ success: true, data });
});

//delete teams data
exports.DeleteTeamsData = asyncErrorHandler(async (req, res, next) => {
  const data = await teamsData.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "No item found" });
  }
});


//-----------------------------------Architecture page------------------------------------------------------------------

//post research data 
exports.addResearch = asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new Research({
    ...req.body.research,
  });

  await data.save();

  res.status(201).json({ success: true, data });
});

//get all research data
exports.getAllResearch = asyncErrorHandler(async (req, res, next) => {
  const data = await Research.find();

  res.status(200).json({ success: true, data });
});

//delete research data
exports.DeleteResearch = asyncErrorHandler(async (req, res, next) => {
  const data = await Research.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "No item found" });
  }
});


//post project data 
exports.addproject = asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new Project({
    ...req.body.project,
  });

  await data.save();

  res.status(201).json({ success: true, data });
});

//get all project data
exports.getAllproject = asyncErrorHandler(async (req, res, next) => {
  const data = await Project.find();

  res.status(200).json({ success: true, data });
});

//delete project data
exports.Deleteproject = asyncErrorHandler(async (req, res, next) => {
  const data = await Project.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "No item found" });
  }
});

//-----------------------------------Stay/property page------------------------------------------------------------------

//add stay/property data
exports.addStayProperty= asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new StayProperty({
    ...req.body.StayProperty,
  });

  await data.save();

  res.status(201).json({ success: true, data });
});

//get all stay/property data
exports.getAllstayProperty = asyncErrorHandler(async (req, res, next) => {
  const data = await StayProperty.find();

  res.status(200).json({ success: true, data });
});

//delete stay/property data
exports.DeletestayProperty = asyncErrorHandler(async (req, res, next) => {
  const data = await StayProperty.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "No item found" });
  }
});

//-----------------------------------Experience page------------------------------------------------------------------

//add experience data
exports.addExperience= asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new Experience({
    ...req.body.Experience,
  });

  await data.save();

  res.status(201).json({ success: true, data });
});

//get all experience data
exports.getAllExperience = asyncErrorHandler(async (req, res, next) => {
  const data = await Experience.find();

  res.status(200).json({ success: true, data });
});

//delete experience data
exports.DeleteExperience = asyncErrorHandler(async (req, res, next) => {
  const data = await Experience.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "No item found" });
  }
});

//-----------------------------------Workshop page------------------------------------------------------------------

//add experience data
exports.addWorkshop= asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new Workshop({
    ...req.body.Workshop,
  });

  await data.save();

  res.status(201).json({ success: true, data });
});

//get all Workshop data
exports.getAllWorkshop = asyncErrorHandler(async (req, res, next) => {
  const data = await Workshop.find();

  res.status(200).json({ success: true, data });
});

//delete Workshop data
exports.DeleteWorkshop = asyncErrorHandler(async (req, res, next) => {
  const data = await Workshop.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "No item found" });
  }
});

//-----------------------------------Library page------------------------------------------------------------------

//add Library data
exports.addLibrary= asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new Library({
    ...req.body.Library,
  });

  await data.save();

  res.status(201).json({ success: true, data });
});

//get all Library data
exports.getAllLibrary = asyncErrorHandler(async (req, res, next) => {
  const data = await Library.find();

  res.status(200).json({ success: true, data });
});

//delete Library data
exports.DeleteLibrary = asyncErrorHandler(async (req, res, next) => {
  const data = await Library.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "No item found" });
  }
});

//-----------------------------------Press page------------------------------------------------------------------

//add Press data
exports.addPress= asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new Press({
    ...req.body.Press,
  });

  await data.save();

  res.status(201).json({ success: true, data });
});

//get all Press data
exports.getAllPress = asyncErrorHandler(async (req, res, next) => {
  const data = await Press.find();

  res.status(200).json({ success: true, data });
});

//delete Press data
exports.DeletePress = asyncErrorHandler(async (req, res, next) => {
  const data = await Press.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "No item found" });
  }
});