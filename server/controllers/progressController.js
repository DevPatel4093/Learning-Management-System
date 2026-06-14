const Lesson =
require("../models/Lesson");

const Enrollment =
require("../models/Enrollment");

const LessonCompletion =
require("../models/LessonCompletion");

exports.markLessonComplete =
async (req, res) => {

    try {

        const { lessonId } = req.body;

        const lesson =
            await Lesson.findById(
                lessonId
            );
        
        const enrollment =
            await Enrollment.findOne({
                student: req.user.id,
                course: lesson.course
            });

            if (!enrollment) {

                return res.status(403).json({
                    message:
                    "You must enroll in the course first"
                });

            }
        if (!lesson) {

            return res.status(404)
            .json({
                message:
                "Lesson not found"
            });

        }

        const existing =
            await LessonCompletion.findOne({
                student: req.user.id,
                lesson: lessonId
            });

        if (existing) {

            return res.json({
                message:
                "Already completed"
            });

        }

        await LessonCompletion.create({
            student: req.user.id,
            lesson: lessonId,
            course: lesson.course
        });

        res.json({
            success: true,
            message:
            "Lesson completed"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getCourseProgress =
async (req, res) => {

    try {

        const courseId =
            req.params.courseId;

        const totalLessons =
            await Lesson.countDocuments({
                course: courseId
            });

        const completedLessons =
            await LessonCompletion.countDocuments({
                student: req.user.id,
                course: courseId
            });

        const progress =
            totalLessons === 0
            ? 0
            : Math.round(
                (
                    completedLessons /
                    totalLessons
                ) * 100
            );

        res.json({

            totalLessons,
            completedLessons,
            progress

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};