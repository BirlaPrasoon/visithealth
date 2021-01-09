const { Sequelize } = require("sequelize");

const mysqlHost = "localhost";
const mysqlDatabase =  "visit";
const mysqlUsername = "root";
const mysqlPassword = "visithealth";

const sequelize = new Sequelize({
    host: mysqlHost,
    database: mysqlDatabase,
    username: mysqlUsername,
    password: mysqlPassword,
    dialect: "mysql"
});

module.exports = sequelize;