const express = require("express");
const router = express.Router();

//controllers
const {createOrder, getUserOrders, addFeedbackForOrderNumber,uploadFileURLs} = require("../controllers/orderControllers")

router.post("/create/order", createOrder);

  router.get("/get/user/orders/:id", getUserOrders);

  router.put("/add/feedback/:orderNumber",addFeedbackForOrderNumber)

  router.put("/upload/file/:id",uploadFileURLs)


module.exports = router