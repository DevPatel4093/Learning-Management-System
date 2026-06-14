const mongoose = require("mongoose");

const quizAttemptSchema =
new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },

    score: {
        type: Number
    },

    passed: {
        type: Boolean
    }

}, {
    timestamps: true
});

module.exports =
mongoose.model(
    "QuizAttempt",
    quizAttemptSchema
);