const { createResponse } = require("../web/response/response");
const jwt = require("jsonwebtoken");

const accessValidation = (req, res, next) => {
    const { authorization } = req.headers;

    // Check if Authorization header exists
    if (!authorization) {
        return res.status(401).send(createResponse("Authorization header is required"));
    }

    // Split Authorization header into token and secret
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    try {
        // Decode token
        const jwtDecode = jwt.verify(token, secret);

        // Set user data to request object
        if (typeof jwtDecode !== "string") {
            req.userData = jwtDecode;
        }
    } catch (error) {
        return res.status(401).send(createResponse("Invalid token"));
    }

    // Continue to next middleware
    next();
};

module.exports = accessValidation;