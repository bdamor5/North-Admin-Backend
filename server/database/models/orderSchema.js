const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  billingInfo: [],
  usedBillingInfo: {},
  deliveryInfo: {},
  cartItems: [],
  userId: {
    type: String,
    ref: "User",
    required: true,
    default: "-"
  },

  paidAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  totalBasketAmount: {
    type: Number,
    required: true,
    default: 0
  },
  totalTransactionAmount: {
    type: Number,
    required: true,
    default: 0
  },
  totalDiscountAmount: {
    type: Number,
    required: true,
    default: 0
  },
  totalBasketItems: {
    type: Number,
    required: true,
    default: 0
  },

  paymentStatus: {
    type: String,
    required: true,
    default: "Order Placed",
  },

  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  orderNumber: {
    type: String,
    required: true,
    default: "-"
  },
  feedback: {
    type: String,
    default: "-",
  },
  remarks: [],
  hsnCode:[],
  razorpay_payment_id: String,
  shippingInfoRemarks: {
    type: String,
    default: "",
  },

  deliveredAt: Date,

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  username: String,
  uploadedFiles:[]
});

module.exports = mongoose.model("Order", orderSchema);
