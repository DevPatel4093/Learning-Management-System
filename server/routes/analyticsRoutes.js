const express = require("express");

const router = express.Router();

const {
    adminAnalytics
} = require("../controllers/analyticsController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

router.get(
    "/admin",
    protect,
    authorize("admin"),
    adminAnalytics
);

module.exports = router;