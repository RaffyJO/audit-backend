const { createResponse } = require("../../web/response/response");
const { validationResult } = require("express-validator");
const express = require("express");
const validateAudit = require("../../web/request/audit.validator");

const { 
    getAudits,
    createAudit,
    updateAudit
} = require("./audit.service");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const userId = req.userData.data.id;
        const audits = await getAudits(userId);
        res.status(200).send(createResponse("Get audits success", audits));
    } catch (error) {
        res.status(500).send(createResponse("Failed to get audits", error.message));
    }
});

router.post("/", validateAudit, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(createResponse("Validation failed", errors.array()));
    }

    try {
        const { start_date, close_date, ...auditData } = req.body;

        const startDate = new Date(start_date);
        const closeDate = new Date(close_date);

        auditData.start_date = startDate;
        auditData.close_date = closeDate;

        const userId = req.userData.data.id;
        const audit = await createAudit(userId, auditData);
        res.status(201).send(createResponse("Create audit success", audit));
    } catch (error) {
        res.status(500).send(createResponse("Failed to create audit", error.message));
    }
});

router.put("/:id", validateAudit, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(createResponse("Validation failed", errors.array()));
    }

    try {
        const id = req.params.id;
        const { start_date, close_date, ...auditData } = req.body;

        const startDate = new Date(start_date);
        const closeDate = new Date(close_date);

        auditData.start_date = startDate;
        auditData.close_date = closeDate;

        const userId = req.userData.data.id;
        const audit = await updateAudit(parseInt(id), userId, auditData);
        res.status(200).send(createResponse("Update audit success", audit));
    } catch (error) {
        res.status(500).send(createResponse("Failed to update audit", error.message));
    }
});

module.exports = router;