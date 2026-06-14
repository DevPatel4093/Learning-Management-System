const express = require("express");

const router = express.Router();

const {
    generateReport,
    getReports
} = require(
    "../controllers/reportController"
);

const {
    protect,
    authorize
} = require(
    "../middleware/authMiddleware"
);

router.post(
    "/generate",
    protect,
    authorize("admin"),
    generateReport
);

router.get(
    "/all",
    protect,
    authorize("admin"),
    getReports
);

module.exports = router;