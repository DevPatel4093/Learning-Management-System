const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Payment = require("../models/Payment");
const Report = require("../models/Report");

exports.generateReport =
async (req, res) => {

    try {

        const totalUsers =
            await User.countDocuments();

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

        const report =
            await Report.create({

                generatedBy:
                    req.user.id,

                totalUsers,

                totalCourses,

                totalEnrollments,

                totalRevenue

            });

        res.status(201).json(report);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getReports =
async (req, res) => {

    try {

        const reports =
            await Report.find()
            .populate(
                "generatedBy",
                "name email"
            );

        res.status(200).json(reports);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};