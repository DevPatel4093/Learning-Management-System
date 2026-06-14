const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const User = require("../models/User");

const Course = require("../models/Course");

const Enrollment = require("../models/Enrollment");

const QuizAttempt = require("../models/QuizAttempt");

const Certificate = require("../models/Certificate");

const Lesson = require("../models/Lesson");

const LessonCompletion = require("../models/LessonCompletion");

const Quiz = require("../models/Quiz");

const Notification = require("../models/Notification");

exports.generateCertificate = async (req, res) => {


try {

    const courseId = req.params.courseId;

    const studentId = req.user.id;

    // Check enrollment
    const enrollment =
    await Enrollment.findOne({
        student: studentId,
        course: courseId
    });

    if (!enrollment) {

        return res.status(403).json({
            message: "Not enrolled"
        });

    }

    // Check lesson completion
    const totalLessons =
    await Lesson.countDocuments({
        course: courseId
    });

    const completedLessons =
    await LessonCompletion.countDocuments({
        student: studentId,
        course: courseId
    });

    if (completedLessons !== totalLessons) {

        return res.status(400).json({
            message:
            "Complete all lessons first"
        });

    }

    // Check quiz pass
    const quizzes =
    await Quiz.find({
        course: courseId
    });

    const quizIds =
    quizzes.map(
        quiz => quiz._id
    );

    const passedQuiz =
    await QuizAttempt.findOne({

        student: studentId,

        quiz: {
            $in: quizIds
        },

        passed: true

    });

    if (!passedQuiz) {

        return res.status(400).json({
            message:
            "Pass the course quiz first"
        });

    }

    // Prevent duplicates
    const existing =
    await Certificate.findOne({

        student: studentId,

        course: courseId

    });

    if (existing) {

        return res.json({

            message:
            "Certificate already generated",

            certificate:
            existing

        });

    }

    const certificateId =
    "CERT-" + Date.now();

    // Save certificate
    const certificate =
    await Certificate.create({

        student: studentId,

        course: courseId,

        certificateId

    });

    // Fetch details
    const student =
    await User.findById(
        studentId
    );

    const course =
    await Course.findById(
        courseId
    );

    // Generate PDF
    const doc =
    new PDFDocument();

    const fileName =
    `${certificateId}.pdf`;

    const filePath =
    path.join(
        "certificates",
        fileName
    );

    doc.pipe(
        fs.createWriteStream(
            filePath
        )
    );

    doc.fontSize(28)
    .text(
        "Certificate of Completion",
        {
            align: "center"
        }
    );

    doc.moveDown();

    doc.fontSize(18)
    .text(
        `Awarded to ${student.name}`,
        {
            align: "center"
        }
    );

    doc.moveDown();

    doc.text(
        "Successfully completed",
        {
            align: "center"
        }
    );

    doc.moveDown();

    doc.fontSize(22)
    .text(
        course.title,
        {
            align: "center"
        }
    );

    doc.end();

    // Notification
    await Notification.create({

        user: studentId,

        title:
        "Certificate Earned",

        message:
        "Congratulations! Your certificate is ready."

    });

    res.status(201).json({

        success: true,

        certificateId,

        filePath,

        certificate

    });

} catch (error) {

    res.status(500).json({
        message: error.message
    });

}


};

exports.myCertificates = async (req, res) => {

    try {

        const certificates =
            await Certificate.find({
                student: req.user.id
            })
            .populate("course", "title");

        res.status(200).json(certificates);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};