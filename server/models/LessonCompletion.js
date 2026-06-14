const mongoose = require("mongoose");

const lessonCompletionSchema =
new mongoose.Schema(
{
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
},
{
    timestamps: true
}
);

module.exports =
mongoose.model(
    "LessonCompletion",
    lessonCompletionSchema
);