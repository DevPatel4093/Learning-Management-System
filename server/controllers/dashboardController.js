const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");
const Certificate = require("../models/Certificate");
const User = require("../models/User");
const Payment = require("../models/Payment");

exports.studentDashboard = async (req, res) => {

    try {

        const studentId = req.user.id;

        const totalCoursesEnrolled =
            await Enrollment.countDocuments({
                student: studentId
            });

        const certificatesEarned =
            await Certificate.countDocuments({
                student: studentId
            });

        const enrolledCourses =
            await Enrollment.find({
                student: studentId
            })
            .populate("course");

        res.json({

            totalCoursesEnrolled,

            certificatesEarned,

            enrolledCourses

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.instructorDashboard =
async (req, res) => {

    try {

        const instructorId =
            req.user.id;

        const courses =
            await Course.find({
                instructor:
                instructorId
            });

        const courseIds =
            courses.map(
                c => c._id
            );

        const totalStudents =
            await Enrollment.countDocuments({
                course: {
                    $in: courseIds
                }
            });

        const totalLessons =
            await Lesson.countDocuments({
                course: {
                    $in: courseIds
                }
            });

        const totalQuizzes =
            await Quiz.countDocuments({
                course: {
                    $in: courseIds
                }
            });

        res.json({

            totalCourses:
            courses.length,

            totalStudents,

            totalLessons,

            totalQuizzes

        });

    } catch (error) {

        res.status(500).json({
            message:
            error.message
        });

    }

};

exports.adminDashboard = async (req, res) => {

    try {

        const totalUsers =
            await User.countDocuments();

        const totalStudents =
            await User.countDocuments({
                role: "student"
            });

        const totalInstructors =
            await User.countDocuments({
                role: "instructor"
            });

        const totalCourses =
            await Course.countDocuments();

        const totalRevenueData =
            await Payment.find({
                status: "paid"
            });

        const totalRevenue =
            totalRevenueData.reduce(
                (sum, payment) =>
                    sum + payment.amount,
                0
            );

        res.json({

            totalUsers,
            totalStudents,
            totalInstructors,
            totalCourses,
            totalRevenue

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};