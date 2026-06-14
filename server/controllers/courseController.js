const Course = require("../models/Course");

// Create Course
exports.createCourse = async (req, res) => {

    try {

        const { title, description, price, category } = req.body;

        const course = await Course.create({
            title,
            description,
            price,
            category,
            instructor: req.user.id
        });

        res.status(201).json({
            success: true,
            course
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Courses + Search + Category Filter
exports.getCourses = async (req, res) => {

    try {

        const {
            search,
            category
        } = req.query;

        let query = {};

        // Search by title
        if (search) {

            query.title = {
                $regex: search,
                $options: "i"
            };

        }

        // Filter by category
        if (category) {

            query.category = category;

        }
        console.log(req.query);
        console.log(query);

        const courses =
            await Course.find(query)
                .populate(
                    "instructor",
                    "name email"
                )
                .populate(
                    "category",
                    "name"
                );
        console.log(courses.length);

        res.status(200).json(courses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get Single Course
exports.getCourse = async (req, res) => {

    try {

        const course = await Course.findById(
            req.params.id
        ).populate(
            "instructor",
            "name email"
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json(course);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.myCourses =
async (req, res) => {

    try {

        const courses =
            await Course.find({
                instructor:
                req.user.id
            });

        res.json(courses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Update Course
exports.updateCourse = async (req, res) => {

    try {

        const course =
        await Course.findById(
            req.params.id
        );

        if (!course) {

            return res.status(404).json({
                message: "Course not found"
            });

        }

        if (
            course.instructor.toString()
            !== req.user.id
        ) {

            return res.status(403).json({
                message: "Not authorized"
            });

        }

        const updatedCourse =
        await Course.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        res.json(updatedCourse);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Course
exports.deleteCourse = async (req, res) => {

    try {

        const course =
        await Course.findById(
            req.params.id
        );

        if (!course) {

            return res.status(404).json({
                message: "Course not found"
            });

        }

        if (
            course.instructor.toString()
            !== req.user.id
        ) {

            return res.status(403).json({
                message: "Not authorized"
            });

        }

        await Course.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true,
            message: "Course deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};