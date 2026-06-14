const express = require("express");

const router = express.Router();

const {
    generateCertificate,
    myCertificates
} = require("../controllers/certificateController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

router.post(
    "/generate/:courseId",
    protect,
    authorize("student"),
    generateCertificate
);

router.get(
    "/my-certificates",
    protect,
    authorize("student"),
    myCertificates
);

module.exports = router;