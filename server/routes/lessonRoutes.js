const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
    createLesson,
    getLessonsByCourse,
    getCourseLessonsForStudent,
    updateLesson,
    deleteLesson,
    uploadLessonVideo

} = require("../controllers/lessonController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

router.post(
    "/create",
    protect,
    authorize("instructor"),
    createLesson
);

router.get(
    "/course/:courseId",
    getLessonsByCourse
);

router.put(
    "/:id",
    protect,
    authorize("instructor"),
    updateLesson
);

router.delete(
    "/:id",
    protect,
    authorize("instructor"),
    deleteLesson
);

router.get(
    "/student/:courseId",
    protect,
    authorize("student"),
    getCourseLessonsForStudent
);

router.post(
    "/upload-video",
    protect,
    authorize("instructor"),
    upload.single("video"),
    uploadLessonVideo
);

module.exports = router;