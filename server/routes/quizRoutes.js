const express =
require("express");

const router =
express.Router();

const {

    createQuiz,
    getQuizByCourse,
    submitQuiz

} = require(
    "../controllers/quizController"
);

const {

    protect,
    authorize

} = require(
    "../middleware/authMiddleware"
);

router.post(
    "/",
    protect,
    authorize("instructor"),
    createQuiz
);

router.get(
    "/course/:courseId",
    protect,
    getQuizByCourse
);

router.post(
    "/submit",
    protect,
    authorize("student"),
    submitQuiz
);

module.exports = router;