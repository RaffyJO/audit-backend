const { createResponse } = require("../../web/response/response");
const { validationResult } = require("express-validator");
const express = require("express");
const { validateLogin, validateRegister, validateResetPassword } = require("../../web/request/user.validator");

const { 
    register,
    login,
    resetPassword
} = require("./user.service");

const router = express.Router();

router.post("/register", validateRegister, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(createResponse("Validation failed", errors.array()));
    }

    try {
        const {name, email, password} = req.body;

        const result = await register(email, password, name);
        res.status(201).send(createResponse("Register success", {
            access_token: result
        }));
    } catch (error) {
        res.status(500).send(createResponse("Failed to register", error.message));
    }
});

router.post("/login", validateLogin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(createResponse("Validation failed", errors.array()));
    }

    try {
        const {email, password} = req.body;

        const result = await login(email, password);
        res.status(200).send(createResponse("Login success", {
            access_token: result
        }));
    } catch (error) {
        res.status(500).send(createResponse("Failed to login", error.message));
    }
});

router.post("/reset-password", validateResetPassword, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(createResponse("Validation failed", errors.array()));
    }

    try {
        const {email} = req.body;

        const result = await resetPassword(email);
        res.status(200).send(createResponse("Reset password success", result));
    } catch (error) {
        res.status(500).send(createResponse("Failed to reset password", error.message));
    }
});

module.exports = router;