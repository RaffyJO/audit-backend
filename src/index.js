const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.get("/api", (req, res) => {
    res.send("Welcome to API");
});

const userController = require("./app/user/user.controller");
const auditController = require("./app/audit/audit.controller");
const accessValidation = require("./middleware/access.validation");

app.use(express.json());

app.use("/api/users", userController);
app.use("/api/audits", accessValidation, auditController);

app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
});