const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        token = req.headers.authorization.split(" ")[1];

        try {

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = decoded;

            next();

        } catch (error) {

            return res.status(401).json({
                message: "Token invalid"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }
};
exports.authorize = (...roles) => {

    return (req, res, next) => {

        if (
            !roles.includes(req.user.role)
        ) {

            return res.status(403).json({
                message: "Access denied"
            });
        }

        next();
    };
};