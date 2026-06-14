const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    totalUsers: Number,

    totalCourses: Number,

    totalEnrollments: Number,

    totalRevenue: Number

},
{
    timestamps: true
}
);

module.exports = mongoose.model(
    "Report",
    reportSchema
);