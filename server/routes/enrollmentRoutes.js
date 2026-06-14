const express = require("express");
const router = express.Router();

const {
    enrollCourse,
    getMyCourses
} = require(
    "../controllers/enrollmentController"
);

const {
    protect,
    authorize
} = require(
    "../middleware/authMiddleware"
);

router.post(
    "/enroll",
    protect,
    authorize("student"),
    enrollCourse
);

router.get(
    "/my-courses",
    protect,
    authorize("student"),
    getMyCourses
);

module.exports = router;