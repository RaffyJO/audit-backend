const { check } = require("express-validator");

// Validation for login
const validateLogin = [
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
    check("password")
        .notEmpty()
        .withMessage("Password is required")        
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
];

// Validation for register
const validateRegister = [
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
    check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    check("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ max: 255 })
        .withMessage("Name must not exceed 255 characters"),
];

// Validation for reset password
const validateResetPassword = [
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
];

module.exports = { validateLogin, validateRegister, validateResetPassword };
