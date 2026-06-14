const express = require("express");
const router = express.Router();

const {
    createCourse,
    getCourses,
    getCourse,
    myCourses,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

router.post(
    "/",
    protect,
    authorize("instructor"),
    createCourse
);

router.get("/", getCourses);

router.get("/:id", getCourse);

router.get(
    "/my-courses",
    protect,
    authorize("instructor"),
    myCourses
);

router.put(
    "/:id",
    protect,
    authorize("instructor"),
    updateCourse
);

router.delete(
    "/:id",
    protect,
    authorize("instructor"),
    deleteCourse
);

module.exports = router;