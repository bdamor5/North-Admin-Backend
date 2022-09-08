const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");

//models
const User = require("../database/models/userSchema");

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  const user = await User.findOne({email})
  const user1 = await User.findOne({username})

  if(user || user1){
    res.status(200).json({ message: `${user ? "Email already exists, please try logging in" : "Username already taken"} `, success: true, user});
  }else{
    const user = new User({
      email,
      username,
      password,
    });
  
    await user.save();
  
    res.status(201).json({ message: "User Created", success: true, user});
  }

 
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

