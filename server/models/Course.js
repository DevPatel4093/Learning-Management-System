const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    level: {
        type: String,
        enum: [
            "Beginner",
            "Intermediate",
            "Advanced"
        ],
        default: "Beginner"
    },

    price: {
        type: Number,
        default: 0
    },

    thumbnail: {
        type: String,
        default: ""
    },

    duration: {
        type: Number,
        default: 0
    },

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    category: {
        type:
        mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    averageRating: {
        type: Number,
        default: 0
    },

    totalReviews: {
        type: Number,
        default: 0
    }

},
{
    timestamps: true
}
);

module.exports = mongoose.model(
    "Course",
    courseSchema
);