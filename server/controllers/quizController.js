const Quiz = require("../models/Quiz");
const Course = require("../models/Course");
const QuizAttempt =
require("../models/QuizAttempt");

exports.createQuiz =
async (req, res) => {

    try {

        const {
            title,
            course,
            questions,
            passingScore
        } = req.body;

        const courseData =
        await Course.findById(course);

        if (!courseData) {

            return res.status(404)
            .json({
                message:
                "Course not found"
            });

        }

        if (
            courseData.instructor
            .toString()
            !== req.user.id
        ) {

            return res.status(403)
            .json({
                message:
                "Not your course"
            });

        }

        const quiz =
        await Quiz.create({
            title,
            course,
            questions,
            passingScore
        });

        res.status(201)
        .json(quiz);

    } catch (error) {

        res.status(500)
        .json({
            message:
            error.message
        });

    }
};

exports.getQuizByCourse =
async (req, res) => {

    try {

        const quiz =
        await Quiz.findOne({
            course:
            req.params.courseId
        });

        if (!quiz) {

            return res.status(404)
            .json({
                message:
                "Quiz not found"
            });

        }

        res.json(quiz);

    } catch (error) {

        res.status(500)
        .json({
            message:
            error.message
        });

    }
};

exports.submitQuiz =
async (req, res) => {

    try {

        const {
            quizId,
            answers
        } = req.body;

        const quiz =
        await Quiz.findById(
            quizId
        );

        if (!quiz) {

            return res.status(404)
            .json({
                message:
                "Quiz not found"
            });

        }

        let correct = 0;

        quiz.questions.forEach(
        (q, index) => {

            if (
                answers[index]
                ===
                q.correctAnswer
            ) {
                correct++;
            }

        });

        const score =
        Math.round(
            (
                correct /
                quiz.questions.length
            ) * 100
        );

        const passed =
        score >=
        quiz.passingScore;

        const attempt =
        await QuizAttempt.create({

            student:
            req.user.id,

            quiz:
            quizId,

            score,

            passed

        });

        res.json({

            score,
            passed,
            attempt

        });

    } catch (error) {

        res.status(500)
        .json({
            message:
            error.message
        });

    }
};