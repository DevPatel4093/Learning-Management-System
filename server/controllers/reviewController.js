const Review = require("../models/Review");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

exports.addReview = async (req, res) => {

    try {

        const { courseId } = req.params;

        const {
            rating,
            comment
        } = req.body;

        const studentId =
            req.user.id;

        const enrolled =
            await Enrollment.findOne({
                student: studentId,
                course: courseId
            });

        if (!enrolled) {

            return res.status(403)
            .json({
                message:
                "Enroll first"
            });

        }

        const existingReview =
            await Review.findOne({
                student: studentId,
                course: courseId
            });

        if (existingReview) {

            return res.status(400)
            .json({
                message:
                "Review already submitted"
            });

        }

        const review =
            await Review.create({

                course: courseId,

                student: studentId,

                rating,

                comment

            });

        const reviews =
            await Review.find({
                course: courseId
            });

        const avg =
            reviews.reduce(
                (sum, r) =>
                sum + r.rating,
                0
            ) / reviews.length;

        await Course.findByIdAndUpdate(
            courseId,
            {
                averageRating:
                avg,

                totalReviews:
                reviews.length
            }
        );

        res.status(201)
        .json(review);

    } catch (error) {

        res.status(500)
        .json({
            message:
            error.message
        });

    }

};

exports.getCourseReviews =
async (req, res) => {

    try {

        const reviews =
            await Review.find({

                course:
                req.params.courseId

            })
            .populate(
                "student",
                "name"
            );

        res.json(reviews);

    } catch (error) {

        res.status(500)
        .json({
            message:
            error.message
        });

    }

};