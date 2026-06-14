const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Notification = require("../models/Notification");

exports.enrollCourse = async (req, res) => {

    try {

        const { courseId } = req.body;

        const course =
            await Course.findById(courseId);

        if (!course) {

            return res.status(404).json({
                message: "Course not found"
            });

        }

        const existingEnrollment =
            await Enrollment.findOne({
                student: req.user.id,
                course: courseId
            });

        if (existingEnrollment) {

            return res.status(400).json({
                message:
                "Already enrolled"
            });

        }

        const enrollment =
            await Enrollment.create({
                student: req.user.id,
                course: courseId
            });

            console.log(
    "Creating notification for",
    req.user.id
);

const notification =
await Notification.create({

    user: req.user.id,

    title:
    "Course Enrollment",

    message:
    "You successfully enrolled in the course."

});

console.log(
    "Notification saved:",
    notification._id
);
        res.status(201).json({
            success: true,
            enrollment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getMyCourses =
async (req, res) => {

    try {

        const courses =
            await Enrollment.find({
                student: req.user.id
            })
            .populate({
                path: "course",
                populate: {
                    path: "instructor",
                    select:
                    "name email"
                }
            });

            res.json(courses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};