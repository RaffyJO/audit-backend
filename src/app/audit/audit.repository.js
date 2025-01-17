const prisma = require("../../db");

const getAuditsByUser = async (id) => {
    try {
        return await prisma.audit.findMany({
            where: {
                user_id: id,
            },
            select: {
                id: true,
                title: true,
                area: true,
                start_date: true,
                close_date: true,
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    } catch (error) {
      throw error;
    }
};

const getAuditAllUser = async (limit = null) => {
    try {
        const options = {
            select: {
                id: true,
                title: true,
                area: true,
                start_date: true,
                close_date: true,
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                created_at: 'desc',
            },
        };

        if (limit !== null) {
            options.take = limit;
        }

        return await prisma.audit.findMany(options);
    } catch (error) {
        throw error;
    }
};

const insertAudit = async (userId ,audit) => {
    try {
        return await prisma.audit.create({
            data: {
                title: audit.title,
                area: audit.area,
                start_date: audit.start_date,
                close_date: audit.close_date,
                user_id: userId,
            },
            select: {
                id: true,
                title: true,
                area: true,
                start_date: true,
                close_date: true,
            },
        });
    } catch (error) {
        throw error;
    }
};

const findAuditById = async (id) => {
    try {
        return await prisma.audit.findUnique({
            where: { id: id },
        });
    } catch (error) {
        throw error;
    }
};

const updateAuditById = async (id, audit) => {
    try {
        const auditData = await prisma.audit.update({
            where: { id: id },
            data: {
                title: audit.title,
                area: audit.area,
                start_date: audit.start_date,
                close_date: audit.close_date,
            },
            select: {
                id: true,
                title: true,
                area: true,
                start_date: true,
                close_date: true,
            },
        });

        return auditData;
    } catch (error) {
        throw error;
    }
};

module.exports = { 
    getAuditsByUser,
    getAuditAllUser,
    insertAudit,
    findAuditById,
    updateAuditById
};