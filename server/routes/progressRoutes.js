const express =
require("express");

const router =
express.Router();

const {
    markLessonComplete,
    getCourseProgress
} = require(
    "../controllers/progressController"
);

const {
    protect,
    authorize
} = require(
    "../middleware/authMiddleware"
);

router.post(
    "/complete",
    protect,
    authorize("student"),
    markLessonComplete
);

router.get(
    "/:courseId",
    protect,
    authorize("student"),
    getCourseProgress
);

module.exports = router;