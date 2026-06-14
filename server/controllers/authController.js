const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getCourses = async (req, res) => {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit = 5;

        const keyword = req.query.search
            ? {
                title: {
                    $regex: req.query.search,
                    $options: "i"
                }
            }
            : {};

        const count =
            await Course.countDocuments(
                keyword
            );

        const courses =
            await Course.find(keyword)
                .populate(
                    "instructor",
                    "name email"
                )
                .limit(limit)
                .skip(
                    limit * (page - 1)
                );

        res.json({
            courses,
            page,
            pages:
                Math.ceil(
                    count / limit
                )
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};