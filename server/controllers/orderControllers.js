const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

//models
const Order = require("../database/models/orderSchema");
const User = require("../database/models/userSchema");

exports.createOrder = asyncErrorHandler(async (req, res, next) => {
  const order = new Order({
    ...req.body,
    paidAt: Date.now()
  });
  
  // console.log(req.body.cartItems)

// console.log(req.user)

  await order.save();

  await sendEmail(
    {
      email: req.body.deliveryInfo.email,
      subject: "Your Order Has Been Placed!",
      username: req.body.deliveryInfo.firstname + " " + req.body.deliveryInfo.lastname,
      message: "Your Order Has Been Placed!",
      orderId: req.body.orderNumber,
    },
    "order_placed"
  );

  res.status(201).json({ success: true, order });
});

exports.getUserOrders = asyncErrorHandler(async (req, res, next) => {
  const userOrders = await Order.find({ user: req.params.id });

  console.log(req.params.id)

  res.status(201).json({ success: true, userOrders });
});

exports.addFeedbackForOrderNumber = asyncErrorHandler(async (req, res, next) => {
  if(req.params.orderNumber === 'notLoggedIn'){

    const order = new Order({
      feedback: req.body.feedback,
      paidAt: Date.now()
    });
  
    await order.save()
  
    res.status(201).json({ success: true, order });

  }else if(req.params.orderNumber === 'LoggedIn'){

    const order = new Order({
      feedback : req.body.feedback,
      username : req.body.username,
      paidAt: Date.now()
    });
  
    await order.save()
  
    res.status(201).json({ success: true, order });

  }else{
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });

    if(req.body.feedback === ""){
      order.feedback = "-"
    }else{
      order.feedback = req.body.feedback
    }
  
    await order.save()
  
    res.status(201).json({ success: true, order });
  }
  
});

exports.uploadFileURLs = asyncErrorHandler(async (req, res, next) => {
  // console.log(req.params.id)
  //console.log(req.body)
  
  const order = await Order.findOne({ orderNumber: req.params.id });

  order.uploadedFiles = req.body

  await order.save()

  res.status(201).json({success: true})
  
});
