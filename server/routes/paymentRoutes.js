const express = require("express");

const router = express.Router();

const {

    createOrder,
    verifyPayment,
    getPaymentHistory,
    getInvoice

} = require(
    "../controllers/paymentController"
);

const {

    protect,
    authorize

} = require(
    "../middleware/authMiddleware"
);

// Create Payment Order
router.post(
    "/create-order",
    protect,
    authorize("student"),
    createOrder
);

// Verify Payment
router.post(
    "/verify",
    protect,
    authorize("student"),
    verifyPayment
);

// Payment History
router.get(
    "/history",
    protect,
    authorize("student"),
    getPaymentHistory
);

// Invoice
router.get(
    "/invoice/:paymentId",
    protect,
    authorize("student"),
    getInvoice
);

module.exports = router;