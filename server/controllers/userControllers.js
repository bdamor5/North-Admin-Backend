const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");

//models
const User = require("../database/models/userSchema");

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  const user = new User({
    email,
    username,
    password,
  });

  await user.save();

  res.status(201).json({ message: "User Created", success: true, user});
});

//loging in a user
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not registered. Please sign up.", 401));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Login Details", 401));
  }

  res.status(201).json({
    message: "User Logged in successfully",
    success: true,
    user
  });
});

//to log out
exports.loggingOutUser = asyncErrorHandler(async (req, res, next) => {
  // res.clearCookie("logintoken", { path: "/" });

  res.status(200).json({ success: true, message: "Logged Out!" });
});

//to get logged in user's details
exports.loggedInUser = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

//update user password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  const { currPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.body.id).select("+password");

  const isPasswordMatched = await bcrypt.compare(currPassword, user.password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("You Entered Your Current Password Wrong", 400)
    );
  }

  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler("New Password & Confirm Password Do Not Match", 400)
    );
  }

  if (newPassword === currPassword) {
    return next(
      new ErrorHandler("New Password Cannot Be Your Previous Password", 400)
    );
  }

  user.password = newPassword;

  //password will be hashed

  await user.save();

  res.status(200).json({ success: true, message: "Password Updated" });
});

//forgot username or password
exports.forgotUnP = async (req, res, next) => {
  try {
    var user = await User.findOne({ email: req.body.email });

    if (!user) return next(new ErrorHandler("User Does Not Exist", 404))

    let forgotValue = req.body.forgotValue === "username" ? "Username" : "Password";

    //to generate & store 6 digit random number as an OTP
    let generatedOTP = Math.floor(100000 + Math.random() * 900000);

    user.OTP = generatedOTP;

    const message = `Dear ${user.username}, \n\nYour Reset ${forgotValue} OTP is :- ${generatedOTP} 
    \n\nThis OTP Will Expire In 5 Minutes.Thank you \n\nRegards, \nCircuit Parts Team`;

    await user.save();

    await sendEmail({
      email: user.email,
      subject: `Cicuit Parts ${forgotValue} Recovery`,
      message,
    });

    setTimeout(() => {
      const OTPexpireTimer = async () => {
        console.log("5 min passed");

        user.OTP = 0;

        await user.save();
      };

      OTPexpireTimer();
    }, 300000);

    res
      .status(200)
      .json({ success: true, message: `A Reset ${forgotValue} OTP Sent!` });
  } catch (err) {
    user.OTP = 0;

    await user.save();

    return next(new ErrorHandler(err.message, 500));
  }
};

//verifying OTP
exports.verifyOTP = asyncErrorHandler(async (req, res, next) => {
  var user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Does Not Exist", 404));
  }

  let receivedOTP = req.body.OTP;
  let generatedOTP = user.OTP;

  user.OTP = 0;
  await user.save();

  if (generatedOTP === receivedOTP) {
    res
      .status(200)
      .json({ success: true, message: "OTP matches!", email: user.email });
  } else {
    res.status(200).json({ success: false, message: "OTP do not match!" });
  }
});

//reset password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Does Not Exist", 404));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password Reseted Successfully" });
});

//reset username
exports.resetUsername = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Does Not Exist", 404));
  }

  if (req.body.username !== req.body.confirmUsername) {
    return next(new ErrorHandler("Usernames do not match", 400));
  }

  user.username = req.body.username;

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Username Reseted Successfully" });
});

//to get orderCount for that user
exports.getOrderCountOfUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.id });

  if (user.orderCount === 999) {
    user.orderCount = 1;
  } else {
    user.orderCount++;
  }

  await user.save();

  res.status(200).json({ success: true, orderCount: user.orderCount - 1 });
});

//get basket items
exports.getBasketItems = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email });

  res.status(200).json({
    success: true,
    basketItems: user.basketItems,
    totalBasketItems: user.totalBasketItems,
    totalBasketAmount: user.totalBasketAmount,
  });
});

//store basket items
exports.storeBasketItems = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email });

  user.basketItems = req.body.basketItems;
  user.totalBasketAmount = req.body.totalBasketAmount;
  user.totalBasketItems = req.body.totalBasketItems;

  await user.save();

  res.status(200).json({ success: true, user });
});
