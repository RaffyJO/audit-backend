const moment = require("moment");

const { 
    getAuditsByUser,
    insertAudit,
    findAuditById,
    updateAuditById
} = require("./audit.repository");

const getAudits = async (id) => {
    try {
        const audits = await getAuditsByUser(id);

        return audits.map((audit) => ({
            id: audit.id,
            auditor: audit.user.name,
            title: audit.title,
            area: audit.area,
            start_date: moment(audit.start_date).format("MM-DD-YYYY HH:mm:ss"),
            close_date: moment(audit.close_date).format("MM-DD-YYYY HH:mm:ss"),
        }));
    } catch (error) {
        throw error;
    }
};

const createAudit = async (userId, audit) => {
    try {
        return await insertAudit(userId, audit);
    } catch (error) {
        throw error;
    }
};

const updateAudit = async (id, userId, audit) => {
    try {
        const existingAudit = await findAuditById(id);

        if (!existingAudit) {
            throw new Error("Audit not found");
        }

        if (existingAudit.user_id !== userId) {
            throw new Error("You are not authorized to update this audit");
        }
        return await updateAuditById(id, audit);
    } catch (error) {
        throw error;
    }
};

module.exports = { 
    getAudits,
    createAudit,
    updateAudit
};