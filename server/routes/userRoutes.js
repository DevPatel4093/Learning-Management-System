const express = require("express");
const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

router.get(
    "/profile",
    protect,
    (req, res) => {

        res.json({
            message: "Protected Route Accessed",
            user: req.user
        });

    }
);

router.get(
    "/instructor-dashboard",
    protect,
    authorize("instructor"),
    (req, res) => {

        res.json({
            message: "Instructor Dashboard"
        });

    }
);

module.exports = router;