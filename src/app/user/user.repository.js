const prisma = require("../../db");

const findUserByEmail = async (email) => {
   try {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    } catch (error) {
        throw error;
    }
};

const insertUser = async (user) => {
    try {
        return await prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                name: user.name,
            },
        });
    } catch (error) {
        throw error;
    }
};

const updateUserPassword = async (email, newPassword) => {
    try {
        return await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                password: newPassword,
            },
        });
    } catch (error) {
        throw error;
    }
};

module.exports = { 
    findUserByEmail,
    insertUser,
    updateUserPassword,
};