const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const { 
    findUserByEmail, 
    insertUser,
    updateUserPassword
} = require("./user.repository");

const register = async (email, password, name) => {
    try {
        const user = await findUserByEmail(email);
        if (user) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await insertUser({
            email: email,
            password: hashedPassword,
            name: name,
        });

        const payload = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
        }
        const secretKey = process.env.JWT_SECRET;
        const expiresIn = 60 * 60 * 1;

        const accessToken = jwt.sign({data: payload}, secretKey, {expiresIn: expiresIn})

        return accessToken;
    } catch (error) {
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            throw new Error("Email or password incorrect");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new Error("Email or password incorrect");
        }

        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
        }
        const secretKey = process.env.JWT_SECRET;
        const expiresIn = 60 * 60 * 1;

        const accessToken = jwt.sign({data: payload}, secretKey, {expiresIn: expiresIn})

        return accessToken;
    } catch (error) {
        throw error;
    }
};

const generateRandomPassword = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
};

const resetPassword = async (email) => {
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            throw new Error("Email not found");
        }

        const newPassword = generateRandomPassword(8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updateUserPassword(user.email, hashedPassword);

        // Create a transporter object
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false, // use SSL
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        });
        
        // Configure the mailoptions object
        const mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: user.email,
            subject: 'Reset Password from Audit Application',
            text: 'Reset Password Successfully, this is your new password: ' + newPassword,
        };
        
        // Send the email
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log('Error sending email: ' + error.message);
                throw new Error('Error sending email: ' + error.message);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = { 
    register,
    login,
    resetPassword,
};