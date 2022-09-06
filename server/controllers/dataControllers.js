const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

//models
const User = require("../database/models/userSchema");
const Testimonial = require("../database/models/testimonialsSchema");

//add testimonials
exports.addTestimonials = asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({ _id: req.params.adminId });

  const data = new Testimonial({
    ...req.body,
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
exports.changeSequenceTestimonials = asyncErrorHandler(
  async (req, res, next) => {
    const DBdata = await Testimonial.find();
    const reqData = req.body;
    // console.log(reqData);
    // console.log(DBdata)

    DBdata.map((db) => {
      reqData.map(async (curr) => {
        if (String(db._id) === curr.id) {
          db.SequenceNo = curr.SequenceNo;
          await db.save();
        }
      });
    });

    res.status(200).json({ success: true, DBdata });
  }
);

exports.addFeedbackForOrderNumber = asyncErrorHandler(
  async (req, res, next) => {
    if (req.params.orderNumber === "notLoggedIn") {
      const order = new Order({
        feedback: req.body.feedback,
        paidAt: Date.now(),
      });

      await order.save();

      res.status(201).json({ success: true, order });
    } else if (req.params.orderNumber === "LoggedIn") {
      const order = new Order({
        feedback: req.body.feedback,
        username: req.body.username,
        paidAt: Date.now(),
      });

      await order.save();

      res.status(201).json({ success: true, order });
    } else {
      const order = await Order.findOne({
        orderNumber: req.params.orderNumber,
      });

      if (req.body.feedback === "") {
        order.feedback = "-";
      } else {
        order.feedback = req.body.feedback;
      }

      await order.save();

      res.status(201).json({ success: true, order });
    }
  }
);

exports.uploadFileURLs = asyncErrorHandler(async (req, res, next) => {
  // console.log(req.params.id)
  //console.log(req.body)

  const order = await Order.findOne({ orderNumber: req.params.id });

  order.uploadedFiles = req.body;

  await order.save();

  res.status(201).json({ success: true });
});
