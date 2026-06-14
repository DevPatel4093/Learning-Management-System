const express = require("express");

const router = express.Router();

const {
    adminReport
} = require("../controllers/reportsController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

router.get(
    "/admin",
    protect,
    authorize("admin"),
    adminReport
);

module.exports = router;