const { check } = require("express-validator");

const validateAudit = [
    check("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 255 })
        .withMessage("Title must not exceed 255 characters"),
    check("area")
        .notEmpty()
        .withMessage("Area is required")
        .isIn(["TOKO", "PASAR"])
        .withMessage("Area must be either 'toko' or 'pasar'"),
    check("start_date")
        .notEmpty()
        .withMessage("Start date is required")
        .isISO8601()
        .withMessage("Start date must be a valid date"),
    check("close_date")
        .notEmpty()
        .withMessage("Close date is required")
        .isISO8601()
        .withMessage("Close date must be a valid date")
        .custom((value, { req }) => {
            const startDate = new Date(req.body.start_date);
            const closeDate = new Date(value);
            if (closeDate < startDate) {
                throw new Error("Close date must be after start date");
            }
            return true;
        }),
];

module.exports = validateAudit;
