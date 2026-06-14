const Lesson = require("../models/Lesson");
const Course = require("../models/Course");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Create Lesson
exports.createLesson = async (req, res) => {

    try {

        const {
            title,
            description,
            duration,
            order,
            course,
            videoUrl
        } = req.body;

        // Find Course
        const courseData =
            await Course.findById(course);

        if (!courseData) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Verify Owner
        if (
            courseData.instructor.toString()
            !== req.user.id
        ) {

            return res.status(403).json({
                message:
                "You can only add lessons to your own course"
            });

        }

        const lesson =
            await Lesson.create({
                title,
                description,
                duration,
                order,
                course,
                videoUrl
            });

        const Enrollment =
            require("../models/Enrollment");

            const Notification =
            require("../models/Notification");

            const enrollments =
            await Enrollment.find({
                course
            });

            for (const enrollment of enrollments) {

                await Notification.create({

                    user:
                    enrollment.student,

                    title:
                    "New Lesson Added",

                    message:
                    `${title} has been added to your course.`

                });

            }
        res.status(201).json({
            success: true,
            lesson
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getLessonsByCourse =
async (req, res) => {

    try {

        const lessons =
            await Lesson.find({
                course:
                req.params.courseId
            })
            .sort("order");

        res.json(lessons);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.updateLesson =
async (req, res) => {

    try {

        const lesson =
            await Lesson.findById(
                req.params.id
            );

        if (!lesson) {
            return res.status(404).json({
                message:
                "Lesson not found"
            });
        }

        const course =
            await Course.findById(
                lesson.course
            );

        if (
            course.instructor.toString()
            !== req.user.id
        ) {

            return res.status(403).json({
                message:
                "Unauthorized"
            });

        }

        const updated =
            await Lesson.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.json(updated);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};

exports.deleteLesson =
async (req, res) => {

    try {

        const lesson =
            await Lesson.findById(
                req.params.id
            );

        if (!lesson) {
            return res.status(404).json({
                message:
                "Lesson not found"
            });
        }

        const course =
            await Course.findById(
                lesson.course
            );

        if (
            course.instructor.toString()
            !== req.user.id
        ) {

            return res.status(403).json({
                message:
                "Unauthorized"
            });

        }

        await lesson.deleteOne();

        res.json({
            message:
            "Lesson deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getCourseLessonsForStudent =
async (req, res) => {

    try {

        const Enrollment =
        require("../models/Enrollment");

        const enrollment =
        await Enrollment.findOne({
            student: req.user.id,
            course: req.params.courseId
        });

        if (!enrollment) {

            return res.status(403).json({
                message:
                "Enroll in course first"
            });

        }

        const lessons =
        await Lesson.find({
            course: req.params.courseId
        }).sort("order");

        res.json(lessons);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const Enrollment = require("../models/Enrollment");
const Notification = require("../models/Notification");

exports.uploadLessonVideo = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                message: "No file uploaded"
            });

        }

        const streamUpload = () => {

            return new Promise((resolve, reject) => {

                const stream =
                cloudinary.uploader.upload_stream(

                    {
                        resource_type: "video",
                        folder: "lms_videos"
                    },

                    (error, result) => {

                        if (result)
                            resolve(result);
                        else
                            reject(error);

                    }

                );

                streamifier
                    .createReadStream(req.file.buffer)
                    .pipe(stream);

            });

        };

        const result =
        await streamUpload();

        res.json({

            success: true,

            videoUrl:
            result.secure_url

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};