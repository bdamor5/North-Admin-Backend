const express = require("express");
const router = express.Router();

const { adminLogin, adminOrders, adminUpdatePassword, adminForgotPassword,updateOrderStatus,addRemarks,addHsnCode } = require("../controllers/adminControllers");

router.post("/login", adminLogin);
router.get("/orders", adminOrders);
router.get("/forgot/password/", adminForgotPassword);
router.put("/reset/password/:token", adminUpdatePassword);
router.put("/update/orderStatus/:orderNumber",updateOrderStatus)
router.put("/add/remarks/:orderNumber",addRemarks)
router.put("/add/hsncode/:orderNumber",addHsnCode)


module.exports = router;
