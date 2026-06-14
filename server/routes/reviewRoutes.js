const express = require("express");

const router = express.Router();

const {
    addReview,
    getCourseReviews
} = require(
    "../controllers/reviewController"
);

const {
    protect,
    authorize
} = require(
    "../middleware/authMiddleware"
);

router.post(
    "/:courseId",
    protect,
    authorize("student"),
    addReview
);

router.get(
    "/:courseId",
    getCourseReviews
);

module.exports = router;