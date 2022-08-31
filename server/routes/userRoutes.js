const express = require("express");
const router = express.Router();

//controllers
const {
    registerUser,
    loginUser,
    loggingOutUser,
    loggedInUser,
    updatePassword,
    forgotUnP,
    resetPassword,
    resetUsername,
    verifyOTP,
    getOrderCountOfUser,
    getBasketItems,
    storeBasketItems
  } = require("../controllers/userControllers");

  router.post("/register", registerUser);

  router.post("/login", loginUser);
  
  router.get("/logout", loggingOutUser);
  
  router.get("/me", loggedInUser);

  router.put("/me/update_password", updatePassword);

//forgot routes
router.post("/forgot/UnP", forgotUnP);

router.put("/password/reset" , resetPassword);

router.put("/username/reset" , resetUsername);

//verifying OTP
router.post("/verify/OTP" , verifyOTP);


router.get("/getOrderCount/:id",getOrderCountOfUser)

router.get("/get/basket/items/:email",getBasketItems)

router.post("/store/basket/items/:email",storeBasketItems)


module.exports = router