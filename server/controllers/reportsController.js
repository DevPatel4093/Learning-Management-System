const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Payment = require("../models/Payment");

exports.adminReport = async (req, res) => {

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

        const payments =
            await Payment.find({
                status: "paid"
            });

        const totalRevenue =
            payments.reduce(
                (sum, p) => sum + p.amount,
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