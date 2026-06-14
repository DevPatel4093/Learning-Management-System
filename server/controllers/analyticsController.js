const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Payment = require("../models/Payment");

exports.adminAnalytics = async (req, res) => {

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

        const totalEnrollments =
            await Enrollment.countDocuments();

        const paidPayments =
            await Payment.find({
                status: "paid"
            });

        const totalRevenue =
            paidPayments.reduce(
                (sum, p) => sum + p.amount,
                0
            );

        res.json({
            totalUsers,
            totalStudents,
            totalInstructors,
            totalCourses,
            totalEnrollments,
            totalRevenue
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};